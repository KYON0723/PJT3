# AI & DATA

### 담당자 : 고광

#### 파일 설명

+ `fastApi.py ` : fast api 연결 코드
+ `model.h5` : 학습된 모델 
+ `emotion_detective.ipynb` : 학습 코드 (colab, jupyterHub 용)
+ `models.py` : 학습된 모델 불러오기
+ `datasets.py` : BERT DATASET
+ `emotion_detective.py` : 감정 분석
+ `music_emotion_recommend.py`: 감정 분석을 통해 음악 추천
+ `music_characteristic_recommend.py` : 곡의 특성을 통한 추천
+ `requirements.txt`: 사용한 라이브러리

------------

### 1. 기능 소개

##### 1) 감정 분석

+ kobert 모델에 감성 말뭉치 데이터를 추가 학습하여 모델 구현
+ 느긋, 신남, 외로움, 우울함, 성가심, 후회, 억울, 두려움, 스트레스, 걱정 총 10 가지의 감정으로 분류
+ Text Data Argumentation을 통해 한정된 데이터의 양을 늘림
+ Sigmoid를 계산하여 각 감정 값들을 퍼센트로 변환



##### 2) 감정 분석을 통한 음악 추천

+ 음악의 가사를 감정 분석하여 퍼센트로 변환하여 저장
+ 텍스트를 감정 분석하여 나온 감정 퍼센트와 유사한 가사를 가사를 가지고 있는 음악을 추천함
  + 각 감정의 퍼센트를 벡터화 진행
  + 코사인 유사도를 사용
  + 사용자가 이미 자신의 플레이 리스트에 추가한 곡을 추천 받으면 안되므로 제외함
  + 가장 유사도가 높은 상위 5개의 곡을 추천 받음



##### 3) 곡의 특성을 통한 추천

+ 콘텐츠 기반 필터링 추천

+ 음악 파일에서 모든 노래의 특성을 추출함

  + Tempo

  ```python
  dict={}
  n= 1850 # 음악 파일의 갯수
  for i in range(1,n+1):
    spectral_centroid=[]
    y, sr = librosa.load(f'./{i}.mp3', sr=44100, duration=10)
    IPython.display.Audio(data=y, rate=sr)
    # s_c=librosa.feature.spectral_centroid(y, sr=sr)
    tempo , _ = librosa.beat.beat_track(y,sr=sr)
    spectral_centroid.append(tempo)
    dict[i] = tempo
    print(dict)
  df_one = pd.DataFrame(dict, index=[0])
  df_one.to_excel("./tempo.xlsx")
  
  ```

  + Zero Crossing Rate

  ```python
  zeroCrossingRate={}
  for i in range(1,n+1):
    spectral_centroid=[]
    y, sr = librosa.load(f'./{i}.mp3', sr=44100, duration=10)
    IPython.display.Audio(data=y, rate=sr)
    s_c=librosa.feature.spectral_centroid(y, sr=sr)
    A=librosa.zero_crossings(y, pad=False)
    zeroCrossingRate[i] = sum(A)
    # frame_num = len(spectral_centroid[0][0])
    # frame[i] = frame_num
  # print(frame)
    print(i)
  df_one = pd.DataFrame(zeroCrossingRate, index=[0])
  df_one.to_excel("./zero_Crossing_Rate.xlsx")
  ```

  + Picth

  ```python
  pitch_dict={}
  for num in range(1,n+1):
  
    audio_sample, sampling_rate = librosa.load(f'./{num}.mp3', sr = None)
  
    S = np.abs(librosa.stft(audio_sample, n_fft=1024, hop_length=512, win_length = 1024, window=signal.hann))
    pitches, magnitudes = librosa.piptrack(S=S, sr=sampling_rate)
  
    shape = np.shape(pitches)
    nb_samples = shape[0]
    nb_windows = shape[1]
    pitch=[]
    for i in range(0, nb_windows):
      index = magnitudes[:,i].argmax()
      pitch.append(pitches[index,i])
    
    pitch_dict[num] = sum(pitch)/len(pitch)
    print(num)
  
  
  df_pitch = pd.DataFrame(pitch_dict, index=[0])
  df_pitch.to_excel("./pitch.xlsx")
  ```

  + loudness 

  ```python
  import librosa
  loudness={}
  length={}
  for num in range(1,1851):
    y , sr = librosa.load(f'./{num}.mp3')
    loudness[num] =len(y)
  
  df_loudness = pd.DataFrame(loudness, index=[0])
  
  df_loudness.to_excel("./loudness.xlsx")
  ```

  + length 

  ``` python
  import librosa
  loudness={}
  length={}
  for num in range(1,1851):
    y , sr = librosa.load(f'./{num}.mp3') 
    length[num] =round((len(y) / sr), 2)#음악의 길이(초) = 음파의 길이/Sampling rate
  
  df_length = pd.DataFrame(length, index=[0])
  df_length.to_excel("./length.xlsx")
  ```

+ 각 특성을 벡터화 진행

+ 사용자가 선택한 곡과 유사한 곡 추천

  + 코사인 유사도를 사용
  + 사용자가 플레이 리스트에 곡을 추가할 때마다 유사한 곡을 추천해줌
  + 이미 플레이 리스트에 추가 되어 있는 곡을 추천 받으면 안되므로 중복 제거 후 추천