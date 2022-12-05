from datasets import BERTDataset, max_len, batch_size
import torch
from torch.utils.data import Dataset
import numpy as np
from models import model, tok


def predict(predict_sentence):
    data = [predict_sentence, '0']
    dataset_another = [data]

    another_test = BERTDataset(dataset_another, 0, 1, tok, max_len, True, False)
    test_dataloader = torch.utils.data.DataLoader(another_test, batch_size=batch_size, num_workers=0)
    for batch_id, (token_ids, valid_length, segment_ids, label) in enumerate(test_dataloader):
        token_ids = token_ids.long()
        segment_ids = segment_ids.long()

        valid_length = valid_length
        label = label.long()
        out = model(token_ids, valid_length, segment_ids)
        scores = 1 / (1 + np.exp(-out.detach().numpy()))

        scores = scores[0]
        sum_scores = sum(scores)
        test_eval = []
        for i in out:
            logits = i
            logits = logits.detach().numpy()

            if np.argmax(logits) == 0:
                test_eval.append("느긋한 하루")
            elif np.argmax(logits) == 1:
                test_eval.append("신난 하루")
            elif np.argmax(logits) == 2:
                test_eval.append("외로운 하루")
            elif np.argmax(logits) == 3:
                test_eval.append("우울한 하루")
            elif np.argmax(logits) == 4:
                test_eval.append("성가신 하루")
            elif np.argmax(logits) == 5:
                test_eval.append("후회가 남는 하루")
            elif np.argmax(logits) == 6:
                test_eval.append("억울한 하루")
            elif np.argmax(logits) == 7:
                test_eval.append("두려운 하루")
            elif np.argmax(logits) == 8:
                test_eval.append("스트레스가 쌓인 하루")
            elif np.argmax(logits) == 9:
                test_eval.append("걱정이 많은 하루")

        for i in range(len(scores)):
            scores[i] = round((scores[i] / sum_scores) * 100, 2)
        emotion_dict = {'relaxed': scores[0],
                        'excited': scores[1],
                        'loneliness': scores[2],
                        'depression': scores[3],
                        'annoyance': scores[4],
                        'regret': scores[5],
                        'unfairness': scores[6],
                        'fear': scores[7],
                        'stress': scores[8],
                        "worry": scores[9]
                        }
    return emotion_dict, test_eval[0]


