export const ordersList = [
  {
    id: "1",
    orderNumber: "00000000001",
    status: "Pedido efetuado",
    deliveryDetails: [],
  },
  {
    id: "2",
    orderNumber: "00000000002",
    status: "Em separação",
    deliveryDetails: [],
  },
  {
    id: "3",
    orderNumber: "00000000003",
    status: "Em rota de entrega",
    deliveryDetails: [
      { date: "01/12/2023", city: "São Paulo", state: "SP" },
      { date: "10/12/2023", city: "Salvador", state: "BA" },
    ],
  },
  {
    id: "13",
    orderNumber: "00000000013",
    status: "Em rota de entrega",
    deliveryDetails: [
      { date: "01/12/2023", city: "São Paulo", state: "SP" },
      { date: "10/12/2023", city: "Rio de Janeiro", state: "RJ" },
    ],
  },
  {
    id: "33",
    orderNumber: "00000000033",
    status: "Em rota de entrega",
    deliveryDetails: [
      { date: "01/12/2023", city: "São Paulo", state: "SP" },
      { date: "10/12/2023", city: "Salvador", state: "BA" },
    ],
  },
  {
    id: "4",
    orderNumber: "00000000004",
    status: "Entregue com sucesso",
    deliveryDetails: [
      { date: "05/12/2023", city: "São Paulo", state: "SP" },
      { date: "19/12/2023", city: "Bento Gonçalves", state: "RS" },
    ],
  },
];
