'use strict';
const canvasSize = 10; 
const rateLimitMinutes = 0.5; 

const canvas = $("#canvas");
const cells = [];


for (let i = 0; i < canvasSize; i++) {
  const row = $("<tr>");
  cells[i] = [];

  for (let j = 0; j < canvasSize; j++) {
    const cell = $("<td>");
    cells[i][j] = cell;

    
    const storedColor = localStorage.getItem(`cell-${i}-${j}`);
    if (storedColor) {
      cell.css("background-color", storedColor);
    }

    row.append(cell);
  }

  canvas.append(row);
}


canvas.on("click", "td", (event) => {
  const lastAssignedTime = localStorage.getItem("lastAssignedTime");
  const currentTime = new Date().getTime();

  if (!lastAssignedTime || currentTime - lastAssignedTime >= rateLimitMinutes * 60 * 1000) {
    const cell = $(event.target);

    if (cell.is("td")) {
      const color = prompt("Choose a color:");

      if (color) {
        
        localStorage.setItem(`cell-${cell[0].parentNode.rowIndex}-${cell[0].cellIndex}`, color);
        localStorage.setItem("lastAssignedTime", currentTime);

        
        cell.animate(
          { backgroundColor: color },
          300,
          () => {
            cell.css("background-color", color);
          }
        );
      }
    }
  } else {
   
    alert(`Color assignment rate-limited. Please try again .`);
  }
});

