import time
import pyaudio
import wave
import sched
import sys
from gpiozero import Button
from gpiozero import LED, PingServer
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
dotenv_path = '/home/igor/firmware/.env'
load_dotenv(dotenv_path)
 
CHUNK = 1024
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 44100
WAVE_OUTPUT_FILENAME = "output.wav"

p = pyaudio.PyAudio()
frames = []
stream = None


is_connected = True
is_busy = False


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
    global is_busy, red, green

# use the audio file as the audio source
    print('recognizer')
        # red.blink(0, 1, 1)
    # red.on()
    is_busy = True
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

    IS_DEBUG = os.getenv("IS_DEBUG_SERVER")
    DEBUG_SERVER_URL = os.getenv("DEBUG_SERVER_URL")
    PROD_SERVER_URL = os.getenv("PROD_SERVER_URL")
 
    url = DEBUG_SERVER_URL if IS_DEBUG == 'true' else PROD_SERVER_URL

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

    is_busy = False
    check_status()


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



def wifi_activated():
    print("wifi_activated")
    global is_connected

    is_connected = True
    check_status()

def wifi_deactivated():
    print("wifi_deactivated")
    global is_connected
    is_connected = False
    check_status()

def check_status():
    global is_connected, is_busy, red, green
    print("check_status")
    print(is_connected)
    print(is_busy)

    if not is_busy:
        if is_connected:
            red.blink(0.2, 2)
        else:
            red.blink(0.5, 0.5)


button.when_pressed = on_press
button.when_released = on_release

google = PingServer('google.com', 2)

google.when_activated = wifi_activated
google.when_deactivated = wifi_deactivated

print ("Press and hold the 'r' key to begin recording")
print ("Release the 'r' key to end recording")


pause()