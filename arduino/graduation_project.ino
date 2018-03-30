#include <SoftwareSerial.h>

SoftwareSerial btSerial(5, 4);      //TX, RX
int Buzzer = 7;                       // 부저 7번
int Sensor = 2;                       // 적외선 송수신 센서 2번
int count = 0;                        // 횟수
int state = 0;                        // 현재 상태
int laststate = HIGH;                 // 마지막 상태 (장애물 감지가 안되는 상태)

void setup() {
  pinMode(Buzzer, OUTPUT);   // 부저를 출력으로 설정
  pinMode(Sensor, INPUT);    // 센서값을 입력으로 설정
  Serial.begin(9600);
  btSerial.begin(9600);
  attachInterrupt(digitalPinToInterrupt(Sensor), CNT, FALLING);     // 적외선 센서 FALLING일때 인터럽트 0번으로 설정
}

void loop() {
  state = digitalRead(Sensor);                    // 센서값 읽어옴

  if (state != laststate) {                       // 장애물 감지가 되면
    if (state == LOW) {                           // 현재 감지가 되는 상태이면
      count++;                                    // 카운트 증가
      btSerial.write(count);                 // 카운트 전송
      Serial.println(count);
      tone(7, 220);                               // 부저가 울린다
      delay(100);
    }
    else {                                        // 장애물 감지가 안되면
      state = HIGH;
      noTone(7);                                  // 부저가 울리지 않는다
      delay(100);
    }
  }
  laststate = state;
  detachInterrupt(digitalPinToInterrupt(Sensor));                  // 인터럽트 비활성화                 
  attachInterrupt(digitalPinToInterrupt(Sensor), CNT, FALLING);    // 인터럽트 활성화
}

void CNT() {
  state = LOW;
}
