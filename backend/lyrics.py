from faster_whisper import WhisperModel
import os
import numpy as np
from pydub import AudioSegment
from concurrent.futures import ThreadPoolExecutor
import threading

class AudioTranscriber:
    def __init__(self, model_size="medium"):
        self.model = WhisperModel(model_size, device="cpu", compute_type="int8")
        self.segment_length = 30 * 1000  # 30 seconds in milliseconds
        self.thread_lock = threading.Lock()
        self.results = []

    def load_audio(self, audio_path):
        return AudioSegment.from_mp3(audio_path)

    def split_audio(self, audio):
        segments = []
        for i in range(0, len(audio), self.segment_length):
            segment = audio[i:i + self.segment_length]
            segments.append((i // self.segment_length, segment))
        return segments

    def process_segment(self, segment_data):
        index, segment = segment_data
        # Export segment to temporary file
        temp_path = f"temp_segment_{index}.wav"
        segment.export(temp_path, format="wav")
        
        try:
            # Transcribe segment
            segments, _ = self.model.transcribe(temp_path, language="vi")
            text = " ".join([seg.text for seg in segments])
            
            # Store result with correct index
            with self.thread_lock:
                self.results.append((index, text))
        finally:
            # Cleanup temp file
            if os.path.exists(temp_path):
                os.remove(temp_path)

    def transcribe(self, audio_path):
        print(f"Loading audio from: {audio_path}")
        
        # Load and split audio
        audio = self.load_audio(audio_path)
        segments = self.split_audio(audio)
        
        # Process segments in parallel
        with ThreadPoolExecutor(max_workers=4) as executor:
            executor.map(self.process_segment, segments)
        
        # Sort and combine results
        self.results.sort(key=lambda x: x[0])
        return " ".join(text for _, text in self.results)

def main():
    audio_path = os.path.join(os.path.dirname(__file__), "downloads", "Chạy Về Khóc Với Anh.mp3")
    
    transcriber = AudioTranscriber(model_size="small")
    transcription = transcriber.transcribe(audio_path)
    
    print("\nLyric (Tiếng Việt):")
    print(transcription)

if __name__ == "__main__":
    main()
