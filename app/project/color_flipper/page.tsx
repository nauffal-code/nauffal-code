// <!DOCTYPE html>
// <html lang="en">
// <head>
// <meta charset="UTF-8" />
// <meta http-equiv="X-UA-Compatible" content="IE=edge" />
// <meta name="viewport" content="width=device-width, initial-scale=1.0" />

// <!-- CSS -->
// <style>
//   :root {
//     --color: #5681a6;
//   }

//   * {
//     padding: 0;
//     margin: 0;
//     text-decoration: none;
//     font-family: "Poppins", sans-serif;
//     text-transform: capitalize;
//   }

//   .close-app {
//     position: fixed;
//     bottom: 20px;
//     right: 20px;
//     display: flex;
//     align-items: center;
//     gap: 5px;
//     background-color: #e04448;
//     color: #eee;
//     font-family: "Poppins", sans-serif;
//     text-decoration: none;
//     padding: 12px 20px;
//     border-radius: 40px;
//     z-index: 9999;
//   }
//   .close-app i {
//     font-size: 20px;
//     transition: 1s;
//   }
//   .close-app:hover i {
//     transform: rotate(360deg);
//   }

//   header {
//     position: fixed;
//     left: 0;
//     right: 0;
//     background-color: #fff;
//     box-shadow: 0 1px 5px rgba(0, 0, 0, 0.5);
//   }
//   nav {
//     text-align: center;
//     padding: 20px;
//   }
//   nav .title {
//     color: var(--color);
//   }

//   .container {
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     gap: 1rem;
//     height: 100vh;
//   }
//   .container h2 {
//     background-color: #000;
//     color: #fff;
//     font-size: 35px;
//     padding: 10px;
//     border-radius: 5px;
//   }
//   .container h2 span {
//     color: var(--color);
//     text-transform: uppercase;
//   }
//   .container .button-container button {
//     background-color: transparent;
//     color: #000;
//     font-size: 20px;
//     border: 1.5px solid #000;
//     border-radius: 5px;
//     padding: 0.5rem 0.8rem;
//     transition: 0.3s;
//   }
//   .container .button-container button.active {
//     background-color: #000;
//     color: #fff;
//   }
// </style>

// <title>Color Flipper</title>
// </head>
// <body>
// <!-- CLOSE APP -->
const ColorFlipper = () => {
  const primary = [
    `red`,
    `orange`,
    `yellow`,
    `lime`,
    `green`,
    `blue`,
    `violet`,
    `purple`,
  ];
  const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, `A`, `B`, `C`, `D`, `E`, `F`];

  const color = document.getElementById(`color`);

  const hexBtn = document.getElementById(`hex-btn`);
  const primaryBtn = document.getElementById(`primary-btn`);

  hexBtn.addEventListener("click", () => {
    if (primaryBtn.classList.contains("active"))
      primaryBtn.classList.remove("active");
    hexBtn.classList.add("active");

    let hexColor = "#";
    for (let i = 0; i < 6; i++) {
      hexColor += hex[getRandomHex()];
    }

    color.textContent = `${hexColor}`;
    document.body.style.backgroundColor = hexColor;
  });
  const getRandomHex = () => Math.floor(Math.random() * hex.length);

  primaryBtn.addEventListener("click", () => {
    if (hexBtn.classList.contains("active")) hexBtn.classList.remove("active");
    primaryBtn.classList.add("active");

    let primaryColor = primary[getRandomPrimary()];
    color.textContent = `${primaryColor}`;
    document.body.style.backgroundColor = primaryColor;
  });
  const getRandomPrimary = () => Math.floor(Math.random() * primary.length);

  return (
    <>
      <a href="../../index.html" className="close-app">
        Close the app <i className="fa-solid fa-circle-xmark"></i>
      </a>

      <header>
        <nav>
          <h1 className="title">Color Flipper</h1>
        </nav>
      </header>
      <main>
        <article className="container">
          <h2>
            Background Color: <span id="color">#f1f5f8</span>
          </h2>
          <div className="button-container">
            <button className="button" id="hex-btn">
              hex
            </button>
            <button className="button" id="primary-btn">
              primary color
            </button>
          </div>
        </article>
      </main>
    </>
  );
};
export default ColorFlipper;
