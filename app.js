const logoText = document.querySelector('#title');

function resizing() {
  window.addEventListener('resize', () => {
    let containerWidth = document.querySelector('#landing').clientWidth;
    let titleSize = 96 * (containerWidth / 960);
    let blurbSize = 48 * (containerWidth / 960);
    console.log(containerWidth, titleSize);
    document.querySelector('#title').style.fontSize = `${titleSize}px`;
    document.querySelector('#blurb').style.fontSize = `${blurbSize}px`;
  });
}

resizing();
