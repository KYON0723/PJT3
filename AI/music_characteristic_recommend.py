import pandas as pd
import sklearn
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics.pairwise import cosine_similarity



def character_recommend(song_id, already_like):
  df_character  = pd.read_csv('./music_characteristic.csv', index_col="id", encoding="cp949")
  labels = df_character[['title']]

  df_character = df_character.drop(columns=['title'])
  df_character_scaled = sklearn.preprocessing.scale(df_character)
  df_character = pd.DataFrame(df_character_scaled, columns= df_character.columns)

  similarity = cosine_similarity(df_character)
  sim_df = pd.DataFrame(similarity, index=labels.index, columns=labels.index)

  def find_similar_songs(name,already_like, n=5):
    series = sim_df[name].sort_values(ascending=False)
    if len(already_like) !=0:
      for i in range(len(already_like)):
        series = series.drop(already_like[i])
    series = series.drop(name)
    series = series.head(n).to_frame()
    return series

  results = find_similar_songs(song_id, already_like)
  results = results.index.values
  results = results.tolist()
  return results


# print(A, B)
# print(character_recommend(1,[]))