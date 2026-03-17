import { Recipe } from '../types';

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: '1',
    name: 'Omelete Simples',
    ingredients: ['ovo', 'sal', 'pimenta', 'manteiga'],
    instructions: [
      'Em uma tigela pequena, quebre os ovos e bata vigorosamente com um garfo por cerca de 1 minuto até ficar homogêneo.',
      'Tempere com uma pitada de sal e pimenta-do-reino a gosto.',
      'Aqueça uma frigideira antiaderente em fogo médio e adicione a manteiga, deixando-a derreter completamente e cobrir todo o fundo.',
      'Despeje a mistura de ovos e deixe cozinhar sem mexer por cerca de 2 minutos, ou até que as bordas comecem a soltar.',
      'Com uma espátula, dobre o omelete ao meio e deixe cozinhar por mais 1 minuto para que o centro fique cremoso, mas cozido.',
      'Retire do fogo e sirva imediatamente.'
    ],
    prepTime: 5,
    difficulty: 'Fácil',
    category: 'Receitas com ovo',
    servings: '1 pessoa',
    image: 'https://picsum.photos/seed/omelete/400/300'
  },
  {
    id: '2',
    name: 'Arroz com Ovo',
    ingredients: ['arroz', 'ovo', 'alho', 'cebola', 'azeite'],
    instructions: [
      'Pique finamente o alho e a cebola.',
      'Em uma panela média, aqueça o azeite em fogo médio e refogue a cebola por 2 minutos até ficar transparente, então adicione o alho e refogue por mais 1 minuto.',
      'Adicione o arroz e frite levemente por 2 minutos, mexendo sempre para envolver nos temperos.',
      'Adicione água fervente (proporção de 2 para 1 de arroz) e sal a gosto. Abaixe o fogo, tampe a panela e cozinhe por cerca de 15 a 18 minutos até a água secar completamente.',
      'Enquanto o arroz descansa por 5 minutos fora do fogo, frite um ovo em uma frigideira com um pouco de azeite ou manteiga por cerca de 3 minutos (gema mole ou dura, conforme preferência).',
      'Sirva o arroz quente com o ovo frito por cima.'
    ],
    prepTime: 25,
    difficulty: 'Fácil',
    category: 'Receitas com arroz',
    servings: '2 pessoas',
    image: 'https://picsum.photos/seed/arrozovo/400/300'
  },
  {
    id: '3',
    name: 'Macarrão Alho e Óleo',
    ingredients: ['macarrão', 'alho', 'azeite', 'sal', 'salsinha'],
    instructions: [
      'Encha uma panela grande com água e leve ao fogo alto. Quando ferver, adicione bastante sal e o macarrão.',
      'Cozinhe o macarrão pelo tempo indicado na embalagem (geralmente entre 8 a 11 minutos) até ficar "al dente".',
      'Enquanto o macarrão cozinha, descasque e corte o alho em lâminas finas.',
      'Em uma frigideira grande, aqueça o azeite em fogo baixo e adicione o alho. Deixe dourar lentamente por cerca de 4 a 5 minutos, tomando cuidado para não queimar (o alho queimado fica amargo).',
      'Escorra o macarrão, reservando meia xícara da água do cozimento.',
      'Misture o macarrão na frigideira com o alho e o azeite, adicione a água reservada e misture bem por 1 minuto em fogo médio.',
      'Finalize com salsinha picada e sirva.'
    ],
    prepTime: 15,
    difficulty: 'Fácil',
    category: 'Massas',
    servings: '2 pessoas',
    image: 'https://picsum.photos/seed/pasta/400/300'
  },
  {
    id: '4',
    name: 'Arroz com Frango',
    ingredients: ['arroz', 'frango', 'tomate', 'cebola', 'milho'],
    instructions: [
      'Corte o peito de frango em cubos pequenos e tempere com sal e pimenta.',
      'Em uma panela grande, aqueça o óleo e doure o frango por cerca de 7 a 10 minutos até ficar bem cozido e dourado.',
      'Adicione a cebola picada e refogue por 3 minutos. Junte o tomate picado e o milho, refogando por mais 2 minutos.',
      'Adicione o arroz e misture bem. Cubra com água quente (cerca de 2 dedos acima do nível do arroz).',
      'Cozinhe em fogo médio com a panela semitampada por cerca de 20 minutos, ou até que a água seque e o arroz esteja macio.',
      'Desligue o fogo, tampe a panela completamente e deixe descansar por 5 minutos antes de servir.'
    ],
    prepTime: 35,
    difficulty: 'Médio',
    category: 'Receitas com frango',
    servings: '4 pessoas',
    image: 'https://picsum.photos/seed/chickenrice/400/300'
  },
  {
    id: '5',
    name: 'Panqueca Simples',
    ingredients: ['farinha de trigo', 'leite', 'ovo', 'sal'],
    instructions: [
      'No liquidificador, coloque o leite, o ovo, a farinha de trigo e uma pitada de sal.',
      'Bata por cerca de 2 minutos até obter uma massa líquida e homogênea.',
      'Deixe a massa descansar na geladeira por 10 minutos (isso ajuda a panqueca a não quebrar).',
      'Aqueça uma frigideira antiaderente levemente untada com óleo em fogo médio.',
      'Coloque uma concha pequena de massa no centro e gire a frigideira para espalhar bem.',
      'Cozinhe por cerca de 1 a 2 minutos até as bordas dourarem e soltarem. Vire e cozinhe o outro lado por mais 1 minuto.',
      'Repita o processo até acabar a massa.'
    ],
    prepTime: 15,
    difficulty: 'Fácil',
    category: 'Lanches',
    servings: '3 pessoas',
    image: 'https://picsum.photos/seed/pancake/400/300'
  },
  {
    id: '6',
    name: 'Batata Frita Caseira',
    ingredients: ['batata', 'óleo', 'sal'],
    instructions: [
      'Descasque as batatas e corte-as em palitos uniformes.',
      'Coloque as batatas cortadas em uma tigela com água gelada e deixe descansar por 15 minutos para retirar o excesso de amido.',
      'Escorra a água e seque as batatas MUITO bem com um pano de prato limpo ou papel toalha.',
      'Aqueça o óleo em uma panela funda. Para saber se está quente, coloque um palito de fósforo no óleo; quando acender, está pronto.',
      'Frite as batatas em pequenas porções por cerca de 8 a 10 minutos até ficarem douradas e crocantes.',
      'Retire com uma escumadeira, coloque em papel toalha para absorver o óleo e salgue imediatamente.'
    ],
    prepTime: 25,
    difficulty: 'Fácil',
    category: 'Receitas rápidas',
    servings: '2 pessoas',
    image: 'https://picsum.photos/seed/fries/400/300'
  },
  {
    id: '7',
    name: 'Tapioca Recheada',
    ingredients: ['goma de tapioca', 'queijo', 'presunto'],
    instructions: [
      'Peneire a goma de tapioca diretamente em uma frigideira antiaderente fria, cobrindo todo o fundo uniformemente.',
      'Leve ao fogo médio e espere cerca de 1 a 2 minutos até que a goma se una e forme uma massa única.',
      'Vire a massa com uma espátula e deixe cozinhar o outro lado por mais 30 segundos.',
      'Coloque as fatias de queijo e presunto em uma das metades da tapioca.',
      'Dobre a tapioca ao meio e pressione levemente com a espátula por 1 minuto até o queijo derreter completamente.',
      'Sirva quente.'
    ],
    prepTime: 10,
    difficulty: 'Fácil',
    category: 'Café da manhã',
    servings: '1 pessoa',
    image: 'https://picsum.photos/seed/tapioca/400/300'
  },
  {
    id: '8',
    name: 'Mingau de Aveia',
    ingredients: ['aveia', 'leite', 'açúcar', 'canela'],
    instructions: [
      'Em uma panela pequena, misture a aveia em flocos, o leite e o açúcar (ou mel).',
      'Leve ao fogo baixo, mexendo sempre com uma colher de pau ou espátula para não grudar no fundo.',
      'Cozinhe por cerca de 5 a 7 minutos até que a mistura engrosse e adquira uma consistência cremosa.',
      'Retire do fogo e deixe descansar por 2 minutos (o mingau continua engrossando enquanto esfria um pouco).',
      'Transfira para uma tigela e polvilhe canela em pó a gosto por cima antes de servir.'
    ],
    prepTime: 10,
    difficulty: 'Fácil',
    category: 'Café da manhã',
    servings: '1 pessoa',
    image: 'https://picsum.photos/seed/oatmeal/400/300'
  },
  {
    id: '9',
    name: 'Sanduíche Quente',
    ingredients: ['pão de forma', 'queijo', 'presunto', 'manteiga'],
    instructions: [
      'Passe uma camada fina de manteiga em um dos lados de cada fatia de pão.',
      'Monte o sanduíche colocando o queijo e o presunto entre os lados SEM manteiga das fatias.',
      'Aqueça uma frigideira em fogo baixo.',
      'Coloque o sanduíche na frigideira e deixe dourar por cerca de 2 a 3 minutos de cada lado, pressionando levemente com uma espátula para o queijo derreter bem.',
      'Se preferir, use uma sanduicheira elétrica por cerca de 3 a 4 minutos até a luz indicar que está pronto.'
    ],
    prepTime: 5,
    difficulty: 'Fácil',
    category: 'Lanches',
    servings: '1 pessoa',
    image: 'https://picsum.photos/seed/sandwich/400/300'
  },
  {
    id: '10',
    name: 'Farofa Simples',
    ingredients: ['farinha de mandioca', 'manteiga', 'cebola', 'sal'],
    instructions: [
      'Pique a cebola em cubos bem pequenos.',
      'Em uma frigideira larga ou panela, derreta a manteiga em fogo médio.',
      'Adicione a cebola e refogue por cerca de 4 a 5 minutos até que ela fique bem dourada e levemente crocante.',
      'Adicione a farinha de mandioca aos poucos, mexendo sem parar para que a farinha absorva a manteiga uniformemente.',
      'Continue mexendo por mais 3 a 5 minutos em fogo baixo até a farinha ficar levemente torrada e crocante.',
      'Tempere com sal a gosto e sirva como acompanhamento.'
    ],
    prepTime: 10,
    difficulty: 'Fácil',
    category: 'Receitas econômicas',
    servings: '4 pessoas',
    image: 'https://picsum.photos/seed/farofa/400/300'
  }
];
