import { Recipe } from '../types';

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: '1',
    name: 'Omelete Simples',
    ingredients: ['ovo', 'sal', 'pimenta', 'manteiga'],
    instructions: [
      'Bata os ovos em uma tigela com sal e pimenta.',
      'Aqueça a manteiga em uma frigideira.',
      'Despeje os ovos e cozinhe até dourar.',
      'Dobre ao meio e sirva.'
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
      'Refogue o alho e a cebola no azeite.',
      'Adicione o arroz e frite levemente.',
      'Cozinhe o arroz com água e sal.',
      'Frite um ovo e coloque por cima do arroz pronto.'
    ],
    prepTime: 20,
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
      'Cozinhe o macarrão em água fervente com sal.',
      'Em uma frigideira, doure o alho fatiado no azeite.',
      'Misture o macarrão cozido ao alho e azeite.',
      'Finalize com salsinha picada.'
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
      'Corte o frango em cubos e doure na panela.',
      'Adicione cebola e tomate picados.',
      'Misture o arroz e o milho.',
      'Cubra com água e cozinhe até secar.'
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
      'Bata todos os ingredientes no liquidificador.',
      'Aqueça uma frigideira antiaderente.',
      'Coloque uma concha da massa e espalhe.',
      'Vire quando as bordas soltarem.'
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
      'Descasque e corte as batatas em palitos.',
      'Seque bem as batatas.',
      'Frite em óleo quente até dourar.',
      'Escorra em papel toalha e salgue.'
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
      'Peneire a goma em uma frigideira quente.',
      'Espere a massa unir e vire.',
      'Coloque o queijo e o presunto.',
      'Dobre e espere o queijo derreter.'
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
      'Misture a aveia, o leite e o açúcar em uma panela.',
      'Leve ao fogo baixo mexendo sempre.',
      'Cozinhe até engrossar.',
      'Sirva com canela em pó.'
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
      'Monte o sanduíche com queijo e presunto.',
      'Passe manteiga na parte de fora do pão.',
      'Leve à frigideira ou sanduicheira até dourar.'
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
      'Derreta a manteiga e doure a cebola.',
      'Adicione a farinha aos poucos mexendo sempre.',
      'Tempere com sal e deixe crocante.'
    ],
    prepTime: 10,
    difficulty: 'Fácil',
    category: 'Receitas econômicas',
    servings: '4 pessoas',
    image: 'https://picsum.photos/seed/farofa/400/300'
  }
];
