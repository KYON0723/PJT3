import pandas as pd
import sklearn
from sklearn.preprocessing import LabelEncoder
# from emotion_detective import predict
from sklearn.metrics.pairwise import cosine_similarity


def emotion_recommend(A, already_like):
  df_emo = pd.read_csv('./music_emotion.csv', index_col="id", encoding="cp949")
  labels = df_emo[['title']]

  df_emo = df_emo.drop(columns=['title'])
  df_emo.loc[1851] =[A['relaxed'],A['excited'],A['loneliness'],A['depression'],A['annoyance'],A['regret'],A['unfairness'],A['fear'],A['stress'],A['worry']]
  df_emo_scaled = sklearn.preprocessing.scale(df_emo)
  df_emo = pd.DataFrame(df_emo_scaled, columns= df_emo.columns)


  similarity = cosine_similarity(df_emo)
#벡터의 유사도 , 즉 벡터간의 각도를 통해 추정 cos0 =1 이므로 1에 가까울 수록 유사 / cos180 = -1 이므로 -1에 가까울 수록 다르다.
  labels.loc[1851] ="감정분석"
  sim_df = pd.DataFrame(similarity, index=labels.index, columns=labels.index)

  def find_similar_songs(name, already_like, n=5):
    series = sim_df[name].sort_values(ascending=False)
    if len(already_like) !=0:
      for i in range(len(already_like)):
        series = series.drop(already_like[i])
    series = series.drop(name)
    series = series.head(n).to_frame()
    return series

  results = find_similar_songs(1851, already_like)
  results = results.index.values
  results = results.tolist()
  return results


# print(A, B)