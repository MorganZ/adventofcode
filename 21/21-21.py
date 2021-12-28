def calculate_universe(start1, start2):
    universe = {3:1,4:3,5:6,6:7,7:6,8:3,9:1}
    win = [0, 0]
    score_pos = [{(0,start1):1}, {(0,start2):1}]
    total_prec = 0
    i = 0
    while len(score_pos[0]) > 0 and len(score_pos[1]) > 0:
        score_dict = {}
        total_universe = 0
        temp_score = score_pos[i%2]
        for key, value in universe.items():
            for key_player,val_player in temp_score.items():
                score, pos = key_player[0],key_player[1]
                new_pos = (pos - 1 + key)%10 +1
                new_score = score + new_pos
                new_val = val_player * value
                if new_score <21:
                    key_score = (new_score,new_pos)
                    total_universe += new_val
                    score_dict[key_score] = score_dict.setdefault(key_score, 0) + new_val
                else:
                    win[i%2] += val_player * value * total_prec
        total_prec = total_universe
        score_pos[i%2] = score_dict
        i+=1
    return win