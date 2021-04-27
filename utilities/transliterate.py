import json
import sys
from pathlib import Path


questions_file = Path('../questions.json')
if questions_file.is_file():
    questions = json.loads(questions_file.read_text(encoding='utf8'))
else:
    sys.exit('questions.json not found.')


def find_matching_character(c_in_russian_alphabet):
    '''This function will find a matching Latin characters based on
    questions.json'''

    for q in questions['questions']['characters']:
        if c_in_russian_alphabet in q['q']:
            return q['transl']
    
    return c_in_russian_alphabet


def transliterate(text_in_russian_alphabet):
    '''This function will transliterate from the Russian 
    alphabet to Latin based on questions.json'''
    
    transliterated = []

    for w in text_in_russian_alphabet.split():
        print(w)

        transliterated_word = []

        for c in w:
            transliterated_word.append(find_matching_character(c))

        transliterated.append(''.join(transliterated_word))
        
    return ' '.join(transliterated)


if __name__ == "__main__":
    try:
        q_set = sys.argv[1]
        q = sys.argv[2]
    except IndexError:
        sys.exit('Please provide a question set and a new question')

    if q_set not in questions['questions']:
        sys.exit('Question set not found in questions.json')

    transliterated = transliterate(q)

    questions['questions'][q_set].append({'q': q, 'trans': transliterated})

    print(f'Adding {q} --> {transliterated} to questions.json')

    with open(questions_file, 'w', encoding='utf8') as f:
        json.dump(questions, f, ensure_ascii=False, indent=4)