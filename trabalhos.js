const numDivs = 20;

for (let i = 0; i < numDivs; i++) {
  createDiv();
}

function createDiv() {
  const work = document.createElement('div');
  work.classList.add('work');
  work.appendChild(document.createTextNode('Filipa Orquídea'));

  const randomX = Math.random() * (window.innerWidth - 150);
  const randomY = Math.random() * (window.innerHeight + 350);

  work.style.left = `${randomX}px`;
  work.style.top = `${randomY}px`;


  let isDragging = false;
  let offsetX, offsetY;

  work.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - work.getBoundingClientRect().left;
    offsetY = e.clientY - work.getBoundingClientRect().top;
    work.style.cursor = 'grabbing';
    document.body.style.setProperty("user-select", "none");
    document.body.style.setProperty("-webkit-user-select", "none"); // Safari fix
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const x = e.clientX - offsetX;
      const y = e.clientY - offsetY;

      work.style.left = `${x}px`;
      work.style.top = `${y}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    work.style.cursor = 'grab';
    document.body.style.removeProperty("user-select");
    document.body.style.removeProperty("-webkit-user-select");

  });

  document.body.appendChild(work);

}

const projects = {
  project1: {
    title: "Sistema Interativo + Identidade Visual",
    date: "2025",
    client: "Dissertação de Mestrado",
    description: "Do Som à Forma - Um sistema interdisciplinar para a Criação Tipográfica através da Análise de Som, é um projeto que explora a interseção entre som, tecnologia e design tipográfico. O sistema desenvolvido apresenta formas tipográficas dinâmicas e interativas, baseadas em dados sonoros. O projeto utiliza sensores para capturar dados de som e movimento, que são então processados para gerar formas tipográficas únicas. Através de uma interface interativa, os users podem manipular esses dados em tempo real, criando uma experiência imersiva que combina arte, tecnologia e design. A identidade visual do festival de música reflete essa interdisciplinaridade, incorporando elementos gráficos que evocam tanto a fluidez do som quanto a estrutura das formas tipográficas. O resultado é um sistema inovador que desafia as convenções tradicionais do design tipográfico, oferecendo novas possibilidades para a expressão criativa.",
    tags: ["Sistema", "Interatividade", "Identidade Visual", "Tipografia"],
    images: [
      "Images/tese/tese2.png",
      "Images/tese/tese1.png",
      "Images/tese/tese3.png",
      "Images/tese/tese4.png",
      "Images/tese/tese5.png",
      "Images/tese/tese6.png"
    ]
  },
  project2: {
    title: "Identidade Visual - Exposição",
    date: "2024",
    client: "Oficina de Meios Digitais",
    description: ["LAGEN destaca o trabalho de Daniela Haufe, uma das cofundadoras do Cyan Studio. Esta exposição faz parte de uma série do Colégio das Artes, dedicada a promover a história do design gráfico, apresentando as contribuições de designers contemporâneos e históricos. A exposição tem como objetivo explorar as camadas do trabalho de Haufe, uma técnica que ela emprega com frequência. Cada sala representa uma camada diferente do seu processo criativo, com o layout projetado para refletir esse conceito.Em algumas salas, dispositivos tecnológicos capturam momentos específicos dentro desse espaço, permitindo que os visitantes criem cartazes personalizados da sua experiência no final da exposição. A tecnologia por trás dessa interação envolve etiquetas RFID que rastreiam o percurso de cada visitante pelo espaço. O cartaz final é composto usando dados de várias salas: uma cor da Sala de Cores, uma pose capturada na Sala de Movimento e um filtro visual da Sala de Sobreposição. A exposição também apresenta uma mini impressora tipográfica impressa em 3D, oferecendo uma experiência que conecta as técnicas iniciais de design gráfico com as ferramentas digitais contemporâneas, simbolizando uma jornada dos métodos tradicionais aos modernos, à medida que os visitantes levam seus cartazes personalizados para casa."],
    tags: ["Identidade Visual", "Exposição", "Tecnologia", "3D"],
    images: [
      "Images/odm/odm11.png",
      "Images/odm/odm1.png",
      "Images/odm/odm2.png",
      "Images/odm/odm4.png",
      "Images/odm/odm5.png",
      "Images/odm/odm7.png",
      "Images/odm/odm3.png"
    ]
  },
  project3: {
    title: "Design Editorial",
    date: "2023",
    client: "Laboratório Editorial",
    description: ["Alta & Baixa é uma revista de cultura tipográfica desenvolvida no contexto académico e que tem como objetivo refletir sobre todos os aspetos da tipografia, incluindo a sua história, e cujos conteúdos são deliberadamente ecléticos. Esta é uma revista que também tem uma versão interativa online. Para o desenvolvimento deste projeto contribuí na criação de layout, revisão de paginação e desenvolvimento do website."],
    tags: ["Editorial", "Layout", "Digital", "Composição"],
    images: [
      "Images/le/le1.jpeg",
      "Images/le/le2.jpeg",
      "Images/le/le3.jpeg",
      "Images/le/le4.png",
      "Images/le/le5.png",
      "Images/le/le6.png",
      "Images/le/le7.png"
    ]
  },
  project4: {
    title: "Tipografia Modular",
    date: "2023",
    client: "Tipografia Avançada",
    description: ["Neste projeto fomos desafiados a criar um sistema tipográfico modular, explorando a construção de letras a partir de pedaços de letras que se encontravam nas ruas de Coimbra. O resultado é um conjunto de tipos modulares que podem ser combinados de várias formas, permitindo uma grande flexibilidade na composição tipográfica."],
    tags: ["Módulo", "Tipografia"],
    images: [
      "Images/ta/tp1.jpg",
      "Images/ta/tp2.png",
      "Images/ta/tp3.jpg"
    ]
  },
  project5: {
    title: "Objeto Editorial + Multimédia",
    date: "2022",
    client: "Projeto 3 - Aplicações Multimédia",
    description: ["Fomos desafiados a criar um objeto editorial através de um livro fornecido no catálogo definido. Pegamos assim no Guia da Elegância que fala de moda e regras de etiqueta para mulheres. A partir daqui criámos então como capa uma boneca de vestir, onde a pessoa era desafiada a cortar as roupas da capa e vestir a boneca como assim desejar e no seu interior era onde estava o contéudo do livro. Posto isto, passamos então ao objeto multimédia onde criámos um canal de youtube com a dicas de moda e etiqueta que estavam no livro, mas de uma forma mais divertida. Para este projeto contribuí para a paginação do objeto editorial e para a criação e edição dos vídeos do canal de youtube."
    ],
    tags: ["Editorial", "Multimédia"],
    images: [
      "Images/p3/p31.JPG",
      "Images/p3/p32.JPG",
      "Images/p3/p33.JPG",
      "Images/p3/p34.png"
    ]
  },
  project6: {
    title: "Sistema Visual - Museu",
    date: "2021",
    client: "Teoria do Design e Comunicação",
    description: ["Neste projeto, fomos desafiados a escolher um museu e uma das suas obras onde retirassemos um elemmento da imagem para criar um sistema visual completo, que incluía logotipo, paleta de cores, tipografia e aplicações diversas. O museu escolhido foi o Centro de Arte Contemporânea de Coimbra e foi escolhida uma obra de Henry Taylor, um artista americano que se destaca pelo uso de cores vibrantes, representação de figuras humanas com traços expressivos e uma narrativa visual que combina elementos do cotidiano com comentário social."],
    tags: ["Identidade", "Padrão", "Mockups"],
    images: [
      "Images/tdc/tdc1.jpg",
      "Images/tdc/tdc2.jpg",
      "Images/tdc/tdc3.jpg",
      "Images/tdc/tdc4.jpg",
      "Images/tdc/tdc5.jpg",
      "Images/tdc/tdc6.png"
    ]
  },
  project7: {
    title: "Design Editorial",
    date: "2020",
    client: "História do Design",
    description: ["Desenvolvimento de uma revista sobre a Bauhaus, explorando os seus princípios de design, tipografia e layout. O meu maior contributo para este projeto foi a criação completa da revista, desde a conceção do layout até à escolha tipográfica e composição."],
    tags: ["Editorial", "Layout", "Tipografia", "Revista"],
    images: [
      "Images/hd/capa bauhaus .PNG",
      "Images/hd/revista.png",
      "Images/hd/revista2.png",
      "Images/hd/revista3.png"
    ]
  }
};


function openModal(projectId) {
  const project = projects[projectId];
  const modal = document.getElementById('modal');

  document.getElementById('projectTitle').textContent = project.title;
  document.getElementById('projectDate').textContent = project.date;
  document.getElementById('projectClient').textContent = project.client;
  document.getElementById('projectDescription').textContent = project.description;

  // Main image
  document.getElementById('mainImage').src = project.images[0];

  // Thumbnails
  const thumbnailGrid = document.getElementById('thumbnailGrid');
  thumbnailGrid.innerHTML = '';
  project.images.forEach(img => {
    const thumb = document.createElement('img');
    thumb.src = img;
    thumb.className = 'thumbnail';
    thumb.onclick = () => {
      document.getElementById('mainImage').src = img;
    };
    thumbnailGrid.appendChild(thumb);
  });

  // Tags
  const tagsContainer = document.getElementById('projectTags');
  tagsContainer.innerHTML = '';
  project.tags.forEach(tag => {
    const tagElement = document.createElement('span');
    tagElement.className = 'tag';
    tagElement.textContent = tag;
    tagsContainer.appendChild(tagElement);
  });

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function closeModalOnBackground(event) {
  if (event.target.id === 'modal') {
    closeModal();
  }
}

// Fechar com tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

