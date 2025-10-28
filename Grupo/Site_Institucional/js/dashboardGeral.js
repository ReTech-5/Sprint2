const PizzaLixeiras = document.getElementById("cvs_grafico_pizza");
const BarrasReciclavel = document.getElementById("cvs_grafico_reciclavel");
const BarrasOrganico = document.getElementById("cvs_grafico_organico");

// Gráfico de Barras das Lixeiras Reciclaveis
new Chart(BarrasReciclavel, {
  type: "bar",
  data: {
    labels: [""],
    datasets: [
      {
        label: "Estável",
        data: [3],
        borderColor: ["rgb(0, 128, 0)"],
        borderWidth: 0.5,
        backgroundColor: ["rgb(186, 255, 201)"],
      },
      {
        label: "Moderado",
        data: [18],
        borderColor: ["rgb(204, 204, 0)"],
        borderWidth: 0.5,
        backgroundColor: ["rgb(255, 255, 186)"],
      },
      {
        label: "Alerta",
        data: [7],
        borderColor: ["rgb(255, 140, 0)"],
        borderWidth: 0.5,
        backgroundColor: ["rgb(255, 223, 186)"],
      },
      {
        label: "Crítico",
        data: [3],
        borderColor: ["rgb(255, 0, 0)"],
        borderWidth: 0.5,
        backgroundColor: ["rgb(255, 179, 186)"],
      },
    ],
  },
  options: {
    responsive: true, // Faz o gráfico redimensionar automaticamente com o container
    plugins: {
      // Configurações para plugins nativos (legend, title, tooltip, etc.)
      legend: { display: true }, // Mostra a legenda (nome do dataset)
      title: {
        display: true,
        text: "Lixeiras Recicláveis por Status de Preenchimento",
        color: "black",
        font: { size: 15, weight: "bold", family: "Arial" },
      }, // Título do gráfico
      tooltip: {
        // Personaliza o conteúdo do tooltip (o balão que aparece ao passar o mouse)
        callbacks: {
          label: function (context) {
            // "label" recebe o contexto do ponto e retorna a string que aparecerá no tooltip
            return context.dataset.label + ": " + context.parsed.y;
            // context.dataset.label = nome do dataset
            // context.parsed = valor do data do eixo y
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          // Título do eixo Y
          display: true,
          text: "Quantidade de Lixeiras",
          color: "rgb(4, 32, 13)",
          font: { size: 13, weight: "bold" },
        },
        beginAtZero: true,
      },
      x: {
        title: {
          // Título do eixo X
          display: true,
          text: "Status",
          color: "rgb(4, 32, 13)",
          font: { size: 13, weight: "bold" },
        },
      },
    },
  },
});

// Gráfico de Barras das Lixeiras Orgânicas
new Chart(BarrasOrganico, {
  type: "bar",
  data: {
    labels: [""],
    datasets: [
      {
        label: "Estável",
        data: [8],
        borderColor: ["rgb(0, 128, 0)"],
        borderWidth: 0.5,
        backgroundColor: ["rgb(186, 255, 201)"],
      },
      {
        label: "Moderado",
        data: [13],
        borderColor: ["rgb(204, 204, 0)"],
        borderWidth: 0.5,
        backgroundColor: ["rgb(255, 255, 186)"],
      },
      {
        label: "Alerta",
        data: [4],
        borderColor: ["rgb(255, 140, 0)"],
        borderWidth: 0.5,
        backgroundColor: ["rgb(255, 223, 186)"],
      },
      {
        label: "Crítico",
        data: [6],
        borderColor: ["rgb(255, 0, 0)"],
        borderWidth: 0.5,
        backgroundColor: ["rgb(255, 179, 186)"],
      },
    ],
  },
  options: {
    responsive: true, // Faz o gráfico redimensionar automaticamente com o container
    plugins: {
      // Configurações para plugins nativos (legend, title, tooltip, etc.)
      legend: { display: true }, // Mostra a legenda (nome do dataset)
      title: {
        display: true,
        text: "Lixeiras Orgânicas por Status de Preenchimento",
        color: "black",
        font: { size: 15, weight: "bold", family: "Arial" },
      }, // Título do gráfico
      tooltip: {
        // Personaliza o conteúdo do tooltip (o balão que aparece ao passar o mouse)
        callbacks: {
          label: function (context) {
            // "label" recebe o contexto do ponto e retorna a string que aparecerá no tooltip
            return context.dataset.label + ": " + context.parsed.y;
            // context.dataset.label = nome do dataset
            // context.parsed = valor do data do eixo y
          },
        },
      },
    },
    scales: {
      y: {
        title: {
          // Título do eixo Y
          display: true,
          text: "Quantidade de Lixeiras",
          color: "rgb(4, 32, 13)",
          font: { size: 13, weight: "bold" },
        },
        beginAtZero: true,
      },
      x: {
        title: {
          // Título do eixo X
          display: true,
          text: "Status",
          color: "rgb(4, 32, 13)",
          font: { size: 13, weight: "bold" },
        },
      },
    },
  },
});

// Gráfico de Pizza dos Status das Lixeiras
new Chart(PizzaLixeiras, {
  type: "pie",
  data: {
    labels: ["Estável", "Moderado", "Alerta", "Crítico"],
    datasets: [
      {
        label: "Lixeiras",
        data: [14, 34, 7, 7],
        borderColor: [
          "rgb(0, 128, 0)",
          "rgb(204, 204, 0)",
          "rgb(255, 140, 0)",
          "rgb(255, 0, 0)",
        ],
        borderWidth: 0.5,
        backgroundColor: [
          "rgb(186, 255, 201)",
          "rgb(255, 255, 186)",
          "rgb(255, 223, 186)",
          "rgb(255, 179, 186)",
        ],
        hoverOffset: 4,
      },
    ],
  },
  options: {
    responsive: true, // Faz o gráfico redimensionar automaticamente com o container
    plugins: {
      // Configurações para plugins nativos (legend, title, tooltip, etc.)
      legend: { display: true }, // Mostra a legenda (nome do dataset)
      title: {
        display: true,
        text: "Lixeiras por Status de Preenchimento",
        color: "black",
        font: { size: 15, weight: "bold", family: "Arial" },
      }, // Título do gráfico
      tooltip: {
        // Personaliza o conteúdo do tooltip (o balão que aparece ao passar o mouse)
        callbacks: {
          label: function (context) {
            // "label" recebe o contexto do ponto e retorna a string que aparecerá no tooltip
            return context.dataset.label + ": " + context.parsed;
            // context.dataset.label = nome do dataset
            // context.parsed = valor do data da fatia
          },
        },
      },
    },
  },
});
