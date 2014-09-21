const int tesselPin = 2;   // Input from Tessel
const int analogInPin = A0;  // Analog input pin that the potentiometer is attached to
const int analogOutPin = 11; // Analog output pin that the buzzer is attached to

int isAlarm = 0;
int sensorValue = 0;        // value read from the pot
int outputValue = 0;        // value output to the PWM (analog out)

void setup() {
  // initialize serial communications at 9600 bps:
  Serial.begin(9600); 
  pinMode(tesselPin, INPUT);
}

void loop() {
  isAlarm = digitalRead(tesselPin);

if (isAlarm == 0) {
  outputValue = 1;
  analogWrite(analogOutPin, 50);           
}
else {
  outputValue = 0;
  analogWrite(analogOutPin, 0);
}

  // print the results to the serial monitor:
  Serial.print("isAlarm = " );                       
  Serial.print(isAlarm);      
  Serial.print("\t output = ");      
  Serial.println(outputValue);   

  delay(2);  

}
