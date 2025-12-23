from random import shuffle
from time import sleep

gamenum = input('로또게임 횟수를 입력하세요: ')

for i in range(int(gamenum)):
    balls = [x+1 for x in range(45)]
    ret = []
    for j in range(6):
        shuffle(balls)  # balls를 무작위로 섞고
        number = balls.pop()  # balls의 제일 마지막 숫자를 추출하고 제거
        ret.append(number)  # 추출된 숫자를 ret에 추가
    ret.sort()
    print('로또번호[%d]:' % (i+1), end=' ')
    print(ret)
    sleep(1)
EOF

