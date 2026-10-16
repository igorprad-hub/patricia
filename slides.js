const slides = [
  {
    "title": "Uma cozinha para ficar.",
    "area": "Cozinha",
    "copy": "Madeira, verde profundo e luz quente. Um projeto para preparar, receber e permanecer.",
    "details": [
      "Quatro banquetas no eixo da bancada",
      "Torneira vintage e puxadores concha",
      "Parede lateral branca lisa e quadro junto à coifa"
    ],
    "src": "assets/10-ilha-frontal.webp"
  },
  {
    "title": "Marcenaria que acolhe",
    "area": "Cozinha",
    "copy": "O verde profundo encontra o revestimento branco filetado na parede da pia. Na lateral das prateleiras, a parede recebe pintura branca lisa. A torneira vintage e as arandelas completam a bancada.",
    "details": [
      "Vidro canelado e torneira vintage",
      "Revestimento filetado na parede da pia",
      "Parede lateral branca lisa"
    ],
    "src": "assets/01-marcenaria-luz.webp"
  },
  {
    "title": "Quatro lugares, uma conversa",
    "area": "Cozinha",
    "copy": "A vista lateral revela a frente de madeira e a bancada clara da ilha. Quatro banquetas se distribuem ao longo do lado de convivência, acompanhadas pelos pendentes de metal.",
    "details": [
      "Quatro banquetas centralizadas",
      "Madeira e bancada clara",
      "Pendentes sobre a ilha"
    ],
    "src": "assets/02-ilha-lateral.webp"
  },
  {
    "title": "O lado de quem prepara",
    "area": "Cozinha",
    "copy": "Entre a pia e a ilha, a face de trabalho concentra gavetas e eletrodomésticos integrados. A janela superior envidraçada traz luz natural. A abertura para a sala de refeições mantém o contato entre os ambientes.",
    "details": [
      "Cuba dupla e torneira vintage",
      "Gavetas e equipamentos na ilha",
      "Conexão com a sala de refeições"
    ],
    "src": "assets/03-face-de-preparo.webp"
  },
  {
    "title": "Da receita à mesa",
    "area": "Cozinha & refeições",
    "copy": "A ilha costura a cozinha e a sala de refeições. Os pratos apoiam-se em prateleiras de madeira sobre uma parede de ripado branco largo. Ao lado, a passagem conecta a despensa e a área de apoio.",
    "details": [
      "Ripado branco largo e prateleiras de pratos",
      "Acesso à despensa ao lado da parede de pratos",
      "Aparador para o café"
    ],
    "src": "assets/04-cozinha-e-jantar.webp"
  },
  {
    "title": "Uma ilha em duas faces",
    "area": "Cozinha",
    "copy": "A ilha reúne convivência de um lado e apoio ao preparo do outro. Marcenaria verde, equipamentos integrados e nichos de madeira tornam essa segunda face parte da composição.",
    "details": [
      "Equipamentos na face de trabalho",
      "Nichos nas extremidades",
      "Mesa com vidro e janela interna com vidro leitoso"
    ],
    "src": "assets/05-ilha-funcional.webp"
  },
  {
    "title": "A mesa onde a casa se reúne",
    "area": "Sala de refeições",
    "copy": "A mesa é retangular, de madeira, com vidro transparente sobre o tampo. A janela se volta para outro cômodo e recebe vidro branco leitoso. Cadeiras de madeira e pendente de fibra dão o tom cottage.",
    "details": [
      "Mesa retangular com vidro sobre a madeira",
      "Janela interna com vidro branco leitoso",
      "Porta vai e vem sem puxador e cantinho do café"
    ],
    "src": "assets/06-sala-de-refeicoes.webp"
  },
  {
    "title": "Luz para os pequenos rituais",
    "area": "Área de apoio",
    "copy": "A janela de madeira e as cortinas brancas filtram a luz sobre a bancada em L. Armários claros e paredes em tom oliva dão à área de apoio uma identidade mais suave.",
    "details": [
      "Janela de madeira e cortinas brancas",
      "Marcenaria clara com molduras",
      "Bandeja apoiada sobre a bancada"
    ],
    "src": "assets/07-apoio-janela.webp"
  },
  {
    "title": "Tudo à mão, com respiro",
    "area": "Área de apoio",
    "copy": "A bancada sob a janela se conecta aos pequenos eletrodomésticos. Uma bandeja solta, com borda de madeira e fundo escuro, apoia-se sobre a pedra. Potes e temperos ficam à mão nas prateleiras.",
    "details": [
      "Bandeja solta sobre a bancada em L",
      "Eletrodomésticos agrupados",
      "Potes, livros e temperos à vista"
    ],
    "src": "assets/08-apoio-bancada.webp"
  },
  {
    "title": "Guardar também faz parte",
    "area": "Área de apoio",
    "copy": "O armário alto reúne portas fechadas e nichos abertos para os mantimentos. A batedeira tem tigela de vidro. A bandeja de madeira com fundo escuro fica apoiada sobre a bancada, como uma peça móvel.",
    "details": [
      "Armário alto e nichos para mantimentos",
      "Batedeira com tigela de vidro",
      "Bandeja móvel apoiada sobre a pedra"
    ],
    "src": "assets/09-apoio-organizacao.webp"
  },
  {
    "title": "A casa vista por inteiro",
    "area": "Vista geral",
    "copy": "A perspectiva axonométrica mostra a relação entre cozinha, ilha, sala de refeições e área de apoio. A mesa retangular com vidro aparece integrada ao aparador e às passagens.",
    "details": [
      "Cozinha, refeições e apoio conectados",
      "Mesa retangular com vidro",
      "Nicho aberto, três prateleiras no apoio e painel verde liso"
    ],
    "src": "assets/11-vista-geral.webp"
  }
];
const originalAnnotations = [
  [
    {
      "x": 46,
      "y": 66,
      "kind": "Convivência",
      "title": "O coração da cozinha",
      "copy": "A ilha reúne preparo e convivência. As quatro banquetas centralizadas marcam um lugar para sentar, conversar e participar."
    },
    {
      "x": 44,
      "y": 30,
      "kind": "Atmosfera",
      "title": "Luz para ficar",
      "copy": "Pendentes de desenho delicado e arandelas acesas em 3000 K somam aconchego à luz natural. Sem fitas de LED nos armários ou nas prateleiras."
    },
    {
      "x": 14,
      "y": 49,
      "kind": "Memória",
      "title": "Louças que contam histórias",
      "copy": "Na parede, os pratos coloridos saem do armário e viram composição. Um gesto cottage que transforma objetos do cotidiano em presença afetiva."
    },
    {
      "x": 29,
      "y": 25,
      "kind": "Natureza",
      "title": "O verde também vive",
      "copy": "As plantas pendentes trazem leveza ao alto do ambiente e fazem companhia à madeira. Texturas naturais aproximam a cozinha da atmosfera de jardim."
    }
  ],
  [
    {
      "x": 44,
      "y": 23,
      "kind": "Transparência",
      "title": "Entre mostrar e guardar",
      "copy": "O vidro canelado deixa perceber pratos e utensílios, com a distorção suave de suas ranhuras verticais. As louças participam do ambiente sem ficar totalmente expostas."
    },
    {
      "x": 46,
      "y": 49,
      "kind": "Textura",
      "title": "O branco ganha relevo",
      "copy": "Na parede da pia, o filetado branco vertical cria pequenas sombras. A parede das prateleiras recebe pintura branca lisa. As duas superfícies claras equilibram a marcenaria verde."
    },
    {
      "x": 76,
      "y": 69,
      "kind": "Marcenaria",
      "title": "Um verde que dá unidade",
      "copy": "As portas com moldura retomam o desenho tradicional do cottage. Nos armários inferiores verdes, os puxadores concha dão unidade às portas e gavetas."
    },
    {
      "x": 82,
      "y": 32,
      "kind": "Cotidiano",
      "title": "À mão, à vista",
      "copy": "Sobre a parede branca lisa, as prateleiras de madeira recebem potes e cerâmicas. A cesta e o filtro completam uma bancada que combina organização com a vida da casa."
    }
  ]
];
