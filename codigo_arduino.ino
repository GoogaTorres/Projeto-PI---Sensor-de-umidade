const int ValorAr = 550; // leitura no ar valor de calibração
const int ValorAgua = 230; // leitura na ãgua valor de calibração

int valorUmidadeSolo = 0;
float porcentagemUmidade = 0;

void setup() {
  Serial.begin(9600);
};

void loop() {
  valorUmidadeSolo = analogRead(A0);

  int faixa = ValorAr - ValorAgua;

  int distancia = ValorAr - valorUmidadeSolo;

  porcentagemUmidade = (float)distancia / faixa * 100.0;

  if (porcentagemUmidade < 0) porcentagemUmidade = 0;
  if (porcentagemUmidade > 100) porcentagemUmidade = 100;

  Serial.print("Leitura bruta: ");
  Serial.println(valorUmidadeSolo);
  Serial.print("Umidade: ");
  Serial.print(porcentagemUmidade);
  Serial.println("%");
  Serial.println("");

  delay(1000);
};
