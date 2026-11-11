/* DATOS DE LA APP — dietas, entrenos, lista de la compra y registros iniciales.
   Semana: 0 = lunes … 6 = domingo.
   Cada comida: n = nombre, k = macros, t = qué se come. */
window.DS_DATA = {

  goal: { weight: 82, date: '2026-12-23' },

  gyms: {
    0: '+Fuerte Training Studio',
    2: 'Lant Fit',
    4: '+Fuerte Training Studio',
    5: 'Lant Fit'
  },

  plan: {
    diego: [
      { tag: 'Entreno', total: '~2.042 kcal · P 173 g · C 212 g · G 40 g', meals: [
        { n: 'Desayuno', k: '472 kcal · P 36 g · C 33 g · G 17 g', t: 'Cottage 70 g, pan integral 0% 64 g, 2 huevos revueltos (con 3 g AOVE), café con leche de soja, creatina.' },
        { n: 'Comida', k: '722 kcal · P 73 g · C 82 g · G 6 g', t: 'Lentejas 200 g, pollo 230 g (con 3 g AOVE), arroz integral en seco subido a 80 g, magnesio.' },
        { n: 'Pre-entreno', k: '284 kcal · P 35 g · C 30 g · G 1 g', t: 'Skyr, whey 15 g, plátano.' },
        { n: 'Cena', k: '597 kcal · P 35 g · C 69 g · G 16 g', t: 'Merluza 140 g (con 3 g AOVE al horno), patata 200 g, puré 250 g, frutos secos 25 g y manzana.' }
      ]},
      { tag: 'Descanso', total: '~1.820 kcal · P 149 g · C 199 g · G 45,5 g', meals: [
        { n: 'Desayuno', k: '465 kcal · P 23 g · C 58 g · G 16 g', t: 'Tostada entera de barra con jamón york 60 g, aguacate 75 g, cuenco de tomate triturado, café con leche de soja, creatina.' },
        { n: 'Comida', k: '530 kcal · P 49 g · C 65 g · G 8,5 g', t: 'Carne picada de pollo 180 g (salteada con 3 g AOVE), patata 300 g, puré 250 g, magnesio.' },
        { n: 'Merienda', k: '505 kcal · P 51 g · C 60 g · G 5 g', t: 'Queso fresco batido 250 g, avena 50 g, manzana, whey 30 g.' },
        { n: 'Cena', k: '320 kcal · P 26 g · C 16 g · G 16 g', t: 'Tortilla de 2 huevos + 100 g claras (con 3 g AOVE), 2 tostas de centeno, frutos secos 10 g.' }
      ]},
      { tag: 'Entreno', total: '~2.097 kcal · P 170 g · C 202 g · G 51 g', meals: [
        { n: 'Desayuno', k: '472 kcal · P 36 g · C 33 g · G 17 g', t: 'Cottage 70 g, pan integral 0% 64 g, 2 huevos (con 3 g AOVE), café con leche de soja, creatina.' },
        { n: 'Comida', k: '687 kcal · P 72 g · C 74 g · G 6 g', t: 'Lentejas 200 g, pollo 230 g (con 3 g AOVE), arroz integral en seco subido a 70 g, magnesio.' },
        { n: 'Pre-entreno', k: '284 kcal · P 35 g · C 30 g · G 1 g', t: 'Skyr, whey 15 g, plátano.' },
        { n: 'Cena', k: '687 kcal · P 33 g · C 67 g · G 27 g', t: 'Salmón 125 g (con 3 g AOVE al horno), patata 200 g, puré 250 g, frutos secos 15 g y manzana.' }
      ]},
      { tag: 'Descanso', total: '~1.886 kcal · P 147 g · C 184 g · G 44 g', meals: [
        { n: 'Desayuno', k: '457 kcal · P 35 g · C 30 g · G 12 g', t: 'Pan integral 0% 64 g, aguacate subido a 50 g, pavo 60 g, 150 g claras (con 3 g AOVE), café con leche de soja, creatina.' },
        { n: 'Comida', k: '577 kcal · P 50 g · C 67 g · G 10 g', t: 'Lomo adobado 210 g (con 3 g AOVE), patata 300 g, puré 250 g, magnesio.' },
        { n: 'Merienda', k: '410 kcal · P 32 g · C 57 g · G 4 g', t: 'Queso fresco batido 250 g, avena 40 g, manzana, whey 15 g.' },
        { n: 'Cena', k: '442 kcal · P 30 g · C 30 g · G 18 g', t: 'Merluza 140 g (con 3 g AOVE al horno), puré 250 g, 2 tostas de centeno, frutos secos 25 g.' }
      ]},
      { tag: 'Entreno', total: '~2.140 kcal · P 151 g · C 195 g · G 72 g', meals: [
        { n: 'Desayuno', k: '472 kcal · P 36 g · C 33 g · G 17 g', t: 'Cottage 70 g, pan 64 g, 2 huevos (con 3 g AOVE), café soja, creatina.' },
        { n: 'Comida', k: '667 kcal · P 42 g · C 90 g · G 12 g', t: 'Gnocchi 250 g, carne picada 160 g (con 3 g AOVE), tomate/cebolla, magnesio.' },
        { n: 'Pre-entreno', k: '110 kcal · P 1 g · C 25 g · G 0 g', t: 'Plátano.' },
        { n: 'Post-entreno', k: '170 kcal · P 24 g · C 12 g · G 0 g', t: 'Yogur griego 0% 300 g.' },
        { n: 'Cena', k: '721 kcal · P 54 g · C 35 g · G 37 g', t: '2 wraps high protein, revuelto de 2 huevos + 100 g claras + 60 g pavo (con 3 g AOVE), frutos secos 15 g.' }
      ]},
      { tag: 'Entreno + cheatmeal', total: 'Sin cena: ~1.072 kcal · P 97 g · C 80 g · G 33 g', meals: [
        { n: 'Post-entreno', k: '472 kcal · P 36 g · C 33 g · G 17 g', t: 'Cottage 70 g, pan 64 g, 2 huevos (con 3 g AOVE), café soja, creatina.' },
        { n: 'Comida', k: '459 kcal · P 33 g · C 40 g · G 15 g', t: 'Hamburguesas 160 g (con 3 g AOVE), 3 tostas de centeno, puré 250 g, magnesio.' },
        { n: 'Merienda', k: '174 kcal · P 34 g · C 9 g · G 1 g', t: 'Skyr, whey 15 g.' },
        { n: 'Cena', k: 'Quedan ~1.030 kcal', t: 'Cena libre (cheatmeal).' }
      ]},
      { tag: 'Descanso', total: '~1.916 kcal · P 145 g · C 174 g · G 45 g', meals: [
        { n: 'Desayuno', k: '432 kcal · P 35 g · C 29 g · G 10 g', t: 'Pan 64 g, aguacate 35 g, pavo 60 g, 150 g claras (con 3 g AOVE), café soja, creatina.' },
        { n: 'Comida', k: '562 kcal · P 58 g · C 45 g · G 9 g', t: 'Garbanzos 200 g, pollo 200 g (con 3 g AOVE), puré 250 g, magnesio.' },
        { n: 'Merienda', k: '395 kcal · P 34 g · C 51 g · G 2 g', t: 'Yogur griego 250 g, avena 30 g, manzana, whey 20 g.' },
        { n: 'Cena', k: '527 kcal · P 18 g · C 49 g · G 24 g', t: 'Tortilla de 2 huevos (con 3 g AOVE), patata 200 g, 2 tostas de centeno, frutos secos 20 g.' }
      ]}
    ],

    sheila: [
      { tag: '', total: '~1.218 kcal · P 86,1 g · C 147,2 g · G 30,2 g', meals: [
        { n: 'Desayuno', k: '~248 kcal · P 15,3 g · C 24,8 g · G 9,2 g', t: 'Pan integral 50 g, 1 huevo entero, café con leche de soja (150 ml).' },
        { n: 'Comida', k: '~554 kcal · P 40,0 g · C 78,4 g · G 8,6 g', t: 'Lentejas cocidas 150 g, pollo 100 g, arroz integral (en seco) 40 g, cebolla y ajo al gusto, 1 chorrito de AOVE (5 g). Postre: 1 manzana (o medio plátano).' },
        { n: 'Cena', k: '~416 kcal · P 30,8 g · C 44,0 g · G 12,4 g', t: 'Merluza 150 g, patata 200 g, puré casero 200 g, 1 chorrito de AOVE (10 g).' }
      ]},
      { tag: '', total: '~1.022 kcal · P 75,0 g · C 119,6 g · G 25,7 g', meals: [
        { n: 'Desayuno', k: '~274 kcal · P 23,1 g · C 27,8 g · G 6,9 g', t: 'Tazón con 40 g de copos de avena, 200 ml de leche de soja y 1 scoop (15 g) de proteína en polvo (sin lácteos/vegana).' },
        { n: 'Comida', k: '~452 kcal · P 29,4 g · C 65,0 g · G 8,0 g', t: 'Pollo 100 g, patata 200 g, puré casero 200 g, 1 chorrito de AOVE (5 g). Postre: 1 manzana.' },
        { n: 'Cena', k: '~296 kcal · P 22,5 g · C 26,8 g · G 10,8 g', t: 'Tortilla (1 huevo + 50 g de claras), patata 150 g, fiambre de pavo 40 g, 1 chorrito de AOVE (5 g).' }
      ]},
      { tag: '', total: '~1.196 kcal · P 81,3 g · C 147,2 g · G 30,0 g', meals: [
        { n: 'Desayuno', k: '~248 kcal · P 15,3 g · C 24,8 g · G 9,2 g', t: 'Pan integral 50 g, 1 huevo entero, café con leche de soja (150 ml).' },
        { n: 'Comida', k: '~554 kcal · P 40,0 g · C 78,4 g · G 8,6 g', t: 'Lentejas cocidas 150 g, pollo 100 g, arroz integral (en seco) 40 g, cebolla y especias, 1 chorrito de AOVE (5 g). Postre: 1 manzana (o medio plátano).' },
        { n: 'Cena', k: '~394 kcal · P 26,0 g · C 44,0 g · G 12,2 g', t: 'Salmón 100 g, patata 200 g, puré casero 200 g (sin aceite extra).' }
      ]},
      { tag: '', total: '~1.075 kcal · P 73,1 g · C 117,2 g · G 33,0 g', meals: [
        { n: 'Desayuno', k: '~266 kcal · P 17,9 g · C 25,2 g · G 9,3 g', t: 'Pan integral 50 g, aguacate 30 g, fiambre de pavo 40 g, café con leche de soja (150 ml).' },
        { n: 'Comida', k: '~467 kcal · P 26,4 g · C 66,0 g · G 11,5 g', t: 'Hamburguesa de pollo 100 g (o carne picada/pechuga de pollo 100 g), patata 200 g, puré casero 200 g, 1 chorrito de AOVE (5 g). Postre: 1 manzana.' },
        { n: 'Cena', k: '~342 kcal · P 28,8 g · C 26,0 g · G 12,2 g', t: 'Merluza 150 g, 2 tostas de centeno (~40 g), 1 chorrito de AOVE (10 g).' }
      ]},
      { tag: '', total: '~1.096 kcal · P 70,6 g · C 128,8 g · G 30,5 g', meals: [
        { n: 'Desayuno', k: '~248 kcal · P 15,3 g · C 24,8 g · G 9,2 g', t: 'Pan integral 50 g, 1 huevo entero, café con leche de soja (150 ml).' },
        { n: 'Comida', k: '~478 kcal · P 26,7 g · C 69,0 g · G 10,6 g', t: 'Gnocchi 150 g, carne picada de pollo 100 g, cebolla y especias al salteado, 1 chorrito de AOVE (5 g). Postre: 1 manzana (o medio plátano).' },
        { n: 'Cena', k: '~370 kcal · P 28,6 g · C 35,0 g · G 10,7 g', t: '2 wraps/fajitas de trigo o maíz (~70 g total), pollo 100 g, pimientos y cebolla, 1 chorrito de AOVE (5 g).' }
      ]},
      { tag: 'Base ligera + cena libre', total: 'Hasta la comida: ~554 kcal · P 40,3 g · C 61,3 g · G 15,4 g', meals: [
        { n: 'Desayuno', k: '~248 kcal · P 15,3 g · C 24,8 g · G 9,2 g', t: 'Pan integral 50 g, 1 huevo entero, café con leche de soja (150 ml).' },
        { n: 'Comida', k: '~306 kcal · P 25,0 g · C 36,5 g · G 6,2 g', t: 'Hamburguesa de pollo/pavo 100 g, patata 150 g, puré casero 200 g.' },
        { n: 'Cena', k: 'Quedan ~650–700 kcal de margen', t: 'Cheatmeal libre.' }
      ]},
      { tag: '', total: '~1.063 kcal · P 71,4 g · C 131,1 g · G 25,9 g', meals: [
        { n: 'Desayuno', k: '~266 kcal · P 17,9 g · C 25,2 g · G 9,3 g', t: 'Pan integral 50 g, aguacate 30 g, fiambre de pavo 40 g, café con leche de soja (150 ml).' },
        { n: 'Comida', k: '~478 kcal · P 36,0 g · C 58,0 g · G 10,8 g', t: 'Garbanzos cocidos 150 g, pollo 100 g, puré casero 200 g, 1 chorrito de AOVE (5 g). Postre: 1 manzana.' },
        { n: 'Cena', k: '~319 kcal · P 17,5 g · C 47,9 g · G 5,8 g', t: 'Tortilla (1 huevo + 50 g de claras), patata 200 g, 1 tosta de centeno (~20 g).' }
      ]}
    ]
  },

  shop: [
    { cat: 'Carnes y pescados', items: [
      'Pechuga de pollo (1 pack familiar de ~700 g - 1 kg)',
      'Carne picada de pollo/pavo (1 paquete de ~400 g)',
      'Lomo adobado (1 paquete de ~250 g)',
      'Hamburguesas magras de pollo o vacuno (1 pack de 2 uds)',
      'Pechuga de pavo en lonchas (1 paquete de 200 g)',
      'Filetes / lomos de merluza (1 paquete de ~300 g, fresco o congelado)',
      'Lomo de salmón fresco (1-2 lomos de ~150 g)'
    ]},
    { cat: 'Lácteos, huevos y refrigerados', items: [
      'Huevos M/L (1 docena)',
      'Bote de claras de huevo (1 bote de 500 g)',
      'Queso Cottage Milbona (2 tarrinas)',
      'Queso fresco batido 0% (1 tarrina grande de 500 g)',
      'Skyr natural Milbona (3 tarrinas)',
      'Bebida de soja sin azúcar (1-2 briks)',
      'Wraps / Tortillas High Protein (1 paquete)'
    ]},
    { cat: 'Frutas y verduras', items: [
      'Calabacín',
      'Calabaza',
      'Apio',
      'Zanahorias',
      'Malla de patatas para cocer/asar (2 kg)',
      'Aguacates (1 malla o 2-3 piezas)',
      'Plátanos (1 manojo / 3-4 piezas)',
      'Manzanas (1 bolsa de 1 kg)',
      'Cebolla'
    ]},
    { cat: 'Despensa y secos', items: [
      'Pan de molde 100% integral 0% azúcares (1 paquete)',
      'Tostas de centeno estilo Wasa (1 paquete)',
      'Lentejas cocidas en bote (1 tarro de 400 g)',
      'Garbanzos cocidos en bote (1 tarro de 400 g)',
      'Arroz integral (1 paquete)',
      'Copos de avena (1 paquete)',
      'Gnocchi de patata (1 paquete)',
      'Frutos secos al natural (1 bolsa de nueces/almendras)',
      'Tomate triturado 0%',
      'Mozzarella light',
      'Proteína Whey, Creatina, Magnesio',
      'Café',
      'Especias',
      'Soja',
      'Limón'
    ]},
    { cat: 'Hogar', items: [
      'Inodoro',
      'Quitagrasas'
    ]}
  ],

  progress: [
    { date: '2026-08-17', peso: 92.30, imc: 30.8, grasa: 30.5, osea: 3.23, musculo: 66.0, agua: 47.1, proteina: 18.9, bmr: 1672, edad: 32, altura: 173 },
    { date: '2026-08-24', peso: 89.75, imc: 30.0, grasa: 29.7, osea: 3.19, musculo: 66.7, agua: 47.6, proteina: 19.1, bmr: 1650, edad: 32, altura: 173 },
    { date: '2026-08-31', peso: 89.45, imc: 29.9, grasa: 29.6, osea: 3.19, musculo: 66.8, agua: 47.7, proteina: 19.2, bmr: 1647, edad: 32, altura: 173 },
    { date: '2026-09-07', peso: 89.50, imc: 29.9, grasa: 29.6, osea: 3.19, musculo: 66.8, agua: 47.7, proteina: 19.2, bmr: 1648, edad: 32, altura: 173 },
    { date: '2026-09-14', peso: 89.05, imc: 29.8, grasa: 29.4, osea: 3.18, musculo: 67.0, agua: 47.8, proteina: 19.2, bmr: 1645, edad: 33, altura: 173 },
    { date: '2026-09-30', peso: 88.05, imc: 29.4, grasa: 29.0, osea: 3.17, musculo: 67.4, agua: 48.1, proteina: 19.3, bmr: 1638, edad: 33, altura: 173 },
    { date: '2026-10-07', peso: 86.75, imc: 29.0, grasa: 28.6, osea: 3.15, musculo: 67.8, agua: 48.3, proteina: 19.4, bmr: 1626, edad: 33, altura: 173 },
    { date: '2026-10-14', peso: 85.95, imc: 28.7, grasa: 28.3, osea: 3.14, musculo: 68.0, agua: 48.5, proteina: 19.5, bmr: 1620, edad: 33, altura: 173 },
    { date: '2026-10-21', peso: 85.35, imc: 28.5, grasa: 28.2, osea: 3.13, musculo: 68.2, agua: 48.6, proteina: 19.5, bmr: 1613, edad: 33, altura: 173 },
    { date: '2026-11-04', peso: 84.90, imc: 28.4, grasa: 28.0, osea: 3.12, musculo: 68.3, agua: 48.7, proteina: 19.6, bmr: 1610, edad: 33, altura: 173 },
    { date: '2026-11-11', peso: 83.75, imc: 28.0, grasa: 27.5, osea: 3.10, musculo: 68.8, agua: 49.1, proteina: 19.7, bmr: 1601, edad: 33, altura: 173 }
  ]
};
