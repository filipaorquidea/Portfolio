

// Variável global para armazenar os projetos da API
let projects = {};

// Função para buscar projetos da API
async function fetchProjectsJSON() {
  const response = await fetch('https://api.cosmicjs.com/v3/buckets/portfolio-production-99c3ea10-a439-11f0-aa17-9fff4c4cf152/objects?pretty=true&query=%7B%22type%22:%22projects%22%7D&limit=10&skip=0&read_key=pWazWYWcegDrxBtpCPEDtZR8PwFiZIRxA4agoOXMQWi7tpW8nS&depth=1&props=slug,title,metadata,type,');
  const data = await response.json();
  return data.objects;
}

// Função para processar e estruturar os projetos da API
function processProjects(apiProjects) {
  const processedProjects = {};

  apiProjects.forEach((project, index) => {
    const projectId = `project${index + 1}`;
    const metadata = project.metadata || {};
    const images = [];
    const tags = metadata.tags || [];

    // capturar todas as imagens (Image, Image2, etc.)
    Object.keys(metadata).forEach(key => {
      if (key.toLowerCase().startsWith('image') && metadata[key]?.url) {
        images.push(metadata[key].url);
      }
    });

    // capturar o vídeo, se existir
    let videoUrl = '';
    if (metadata.video) {
      if (metadata.video.url) videoUrl = metadata.video.url;
      else if (metadata.video.imgix_url) videoUrl = metadata.video.imgix_url;
    }

    processedProjects[projectId] = {
      title: project.title,
      date: metadata.date || '',
      client: metadata.client || '',
      description: metadata.description || '',
      tags: tags,
      images: images,
      video: videoUrl
    };
  });

  return processedProjects;
}

// Função para atualizar a galeria
function updateGallery(apiProjects) {
  const gallery = document.querySelector('.gallery');

  if (!gallery) {
    console.error('Elemento .gallery não encontrado!');
    return;
  }

  gallery.innerHTML = ''; // Limpar galeria existente

  apiProjects.forEach((project, index) => {
    const projectId = `project${index + 1}`;

    // Tentar diferentes campos para o ícone
    const metadata = project.metadata || {};
    const imageField = metadata.image;
    const imageUrl = imageField?.url;

    console.log(`Projeto ${index + 1}:`, {
      id: projectId,
      title: project.title,
      imageUrl: imageUrl,
      metadata: metadata
    });

    // Só criar cartão se tiver imagem
    if (!imageUrl) {
      console.warn(`Projeto ${project.title} não tem imagem de ícone!`);
      return;
    }

    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.onclick = () => openModal(projectId);

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = project.title || 'Projeto';
    img.onerror = () => {
      console.error(`Erro ao carregar imagem: ${imageUrl}`);
    };
    img.onload = () => {
      console.log(`Imagem carregada com sucesso: ${imageUrl}`);
    };

    projectCard.appendChild(img);
    gallery.appendChild(projectCard);
  });

  console.log(`Total de cartões criados: ${gallery.children.length}`);
}

// Inicializar quando o documento carregar
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const apiProjects = await fetchProjectsJSON();


    projects = processProjects(apiProjects);
    // Atualizar a galeria com os projetos da API
    updateGallery(apiProjects);
  } catch (error) {
    console.error('Erro ao carregar projetos:', error);
  }
});

// Função para abrir o modal
function openModal(projectId) {
  const project = projects[projectId];
  if (!project) return;

  const modal = document.getElementById('modal');

  document.getElementById('projectTitle').textContent = project.title;
  document.getElementById('projectDate').textContent = project.date;
  document.getElementById('projectClient').textContent = project.client;
  document.getElementById('projectDescription').textContent = project.description;

  const modalImages = document.querySelector('.modal-images');
  const mainImage = document.getElementById('mainImage');
  const thumbnailGrid = document.getElementById('thumbnailGrid');

  // Limpa o conteúdo existente
  thumbnailGrid.innerHTML = '';

  // Remove vídeo existente (se houver)
  let existingVideo = document.getElementById('mainVideo');
  if (existingVideo) existingVideo.remove();

  // Se houver vídeo, insere no topo
  if (project.video) {
    const videoEl = document.createElement('video');
    videoEl.id = 'mainVideo';
    videoEl.src = project.video;
    videoEl.controls = true;
    videoEl.style.width = '100%';
    videoEl.style.borderRadius = '10px';
    videoEl.style.marginBottom = '30px';
    modalImages.insertBefore(videoEl, mainImage);
  }

  // Mostrar imagem principal
  if (project.images.length > 0) {
    mainImage.src = project.images[0];
    mainImage.style.display = 'block';
  } else {
    mainImage.style.display = 'none';
  }

  // Mostrar thumbnails das restantes imagens
  project.images.forEach((img, index) => {
    const thumb = document.createElement('img');
    thumb.src = img;
    thumb.className = 'thumbnail';
    thumb.onclick = () => {
      mainImage.src = img;
    };
    thumbnailGrid.appendChild(thumb);
  });

  // Mostrar tags
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


// Função para fechar o modal
function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Fechar modal ao clicar no fundo
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