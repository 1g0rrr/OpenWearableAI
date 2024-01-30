import time
import pyaudio
import wave
import sched
import sys
from gpiozero import Button
from gpiozero import LED
from signal import pause
import os
from io import BytesIO
import speech_recognition as sr
from openai import OpenAI
import requests
import json
import base64
import pygame
import io
import RPi.GPIO as GPIO

from dotenv import load_dotenv
dotenv_path = '/home/igor/openwearableai_raspberrypi/.env'
load_dotenv(dotenv_path)
 
CHUNK = 1024
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 44100
WAVE_OUTPUT_FILENAME = "output.wav"

p = pyaudio.PyAudio()
frames = []
stream = None

# 
GPIO.setmode(GPIO.BCM)
GPIO.setup(19, GPIO.OUT)
GPIO.output(19, 0)

button = Button(22)
# button = Button(2)
# red = LED(19)


red = LED(20)
red.blink(0.2, 2)

green = LED(12)
green.on()

def send_to_whisper():
# use the audio file as the audio source
    print('recognizer')
        # red.blink(0, 1, 1)
    # red.on()
    red.blink(0.05, 0.3)
    green.on()

    r = sr.Recognizer()
    with sr.AudioFile(WAVE_OUTPUT_FILENAME) as source:
        audio = r.record(source)  # read the entire audio file

    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    print(OPENAI_API_KEY)
    # 
    client = OpenAI(api_key=OPENAI_API_KEY)

        
    wav_data = BytesIO(audio.get_wav_data())
    wav_data.name = "SpeechRecognition_audio.wav"

    transcript = client.audio.transcriptions.create(model="whisper-1", file=wav_data, response_format="text", language="en")
    print(transcript)
    red.blink(0.05, 0.1)

 
    url ="https://us-central1-shinyclubapp.cloudfunctions.net/openaddtextmessagetoassistant"
    r = requests.post(url, data={'textMessage': transcript})
    print(r)
    testresObj = json.loads(r.text)
    base64_encoded_sound_data = testresObj['base64']
    # red.off()
    red.blink(0.05, 0.5)
    green.on()
    print('base64_encoded_sound_data')

    pygame.mixer.init()
    # fixdata = "data:audio/mp3;base64," + base64_encoded_sound_data
    sound_data = base64.b64decode(base64_encoded_sound_data)
    # print(sound_data)
    sound_file = io.BytesIO(sound_data)
    sound = pygame.mixer.Sound(sound_file)
    ch = sound.play()
    while ch.get_busy():
        pygame.time.wait(100)       

    red.blink(0.2, 2)


def on_press(self):
    global p, stream, frames, red
    # red.blink(0, 1, 1)
    print("on_press")
    red.on()
    green.off()


    def callback(in_data, frame_count, time_info, status):
        # print("callback flog")
        frames.append(in_data)
        return (in_data, pyaudio.paContinue)

    stream = p.open(format=FORMAT,
                        channels=CHANNELS,
                        rate=RATE,
                        input=True,
                        frames_per_buffer=CHUNK,
                        stream_callback = callback)
    stream.start_stream()
    print("start Stream")


def on_release(self):
    global  p, stream, frames
 
    print("Stop recording")
    stream.stop_stream()
    stream.close()

    wf = wave.open(WAVE_OUTPUT_FILENAME, 'wb')
    wf.setnchannels(CHANNELS)
    wf.setsampwidth(p.get_sample_size(FORMAT))
    wf.setframerate(RATE)

    # p.terminate()
    wf.writeframes(b''.join(frames))
    wf.close()
    frames = []
    send_to_whisper()
    print ("You should have a wav file in the current directory")

# red.on()

button.when_pressed = on_press
button.when_released = on_release

print ("Press and hold the 'r' key to begin recording")
print ("Release the 'r' key to end recording")


# pygame.mixer.init()
# # fixdata = "data:audio/mp3;base64," + base64_encoded_sound_data
# sound_data = base64.b64decode(base64_encoded_sound_data)
# # print(sound_data)
# sound_file = io.BytesIO(sound_data)
# sound = pygame.mixer.Sound(sound_file)
# ch = sound.play()
# while ch.get_busy():
#     pygame.time.wait(100)


pause()