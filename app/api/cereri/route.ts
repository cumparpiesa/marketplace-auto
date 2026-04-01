let cereri: any[] = [
  {
    id: 1,
    titlu: "Motor 2.0 diesel",
    descriere: "Caut motor 2.0 diesel în stare bună",
    categorie: "motor",
    oras: "cluj",
    imagine: "",
  },
  {
    id: 2,
    titlu: "Ușă stânga față",
    descriere: "Pentru VW Golf 5",
    categorie: "caroserie",
    oras: "bucuresti",
    imagine: "",
  },
  {
    id: 3,
    titlu: "Alternator",
    descriere: "Pentru BMW E90",
    categorie: "electrice",
    oras: "iasi",
    imagine: "",
  },
];

export async function GET() {
  return Response.json(cereri);
}

export async function POST(req: Request) {
  const body = await req.json();

  const nou = {
    id: Date.now(),
    ...body,
  };

  cereri.push(nou);

  return Response.json(nou);
}