export const ordersMock = [
	{
		motivo: 'Recebi o produto errado',
		isAnalyzing: true,
		code: '#1231232',
		isKiosk: true,
		quiosque_troca: 'Quiosque Goold - Itaquera - São Paulo/SP',
		codigo_correios: '20122012',
		data_expiracao_correios: '2024-03-01',
		status: 'Em análise',
		lista_produtos: [
			{
				id: 'a061d0f5-9ea6-4565-a601-0c9fb87508bc',
				quantity: 2,
				title: 'LOÇÃO HIDRATANTE PODEROSA GOOLD - 250ml',
				price: 45,
				category: 'LINHA CORPORAL',
				description:
					'A Loção Hidratante Goold é a escolha perfeita para manter sua pele macia, hidratada e perfumada ao longo do dia.',
				products_photos:
					'https://firebasestorage.googleapis.com/v0/b/gold-app-810f5.appspot.com/o/products%2Fa061d0f5-9ea6-4565-a601-0c9fb87508bc%2F9f11fbf6-4529-4b88-9467-1f91fee5e412?alt=media&token=7e130d1a-0374-4ab2-9fa5-488cb29016f4',
				average_rating: 3,
			},
		],
		data_solicitacao: new Date(2024, 1, 20).toISOString(),
	},
	{
		motivo: 'Produto não atendeu às expectativas',
		isAnalyzing: true,
		code: '#1231232',
		isKiosk: false,
		codigo_correios: '20223013',
		data_expiracao_correios: '2024-02-25',
		status: 'Aguardando troca',
		lista_produtos: [
			{
				id: '6628797d-f547-4da2-8988-cdd85bd41ca4',
				quantity: 2,
				title: 'BODY SPLASH PODEROSA GOOLD - 250ml',
				price: 77,
				category: 'LINHA CORPORAL',
				description:
					'O Body Splash Goold é o toque final perfeito para deixar sua pele perfumada e refrescante o dia todo.',
				products_photos:
					'https://firebasestorage.googleapis.com/v0/b/gold-app-810f5.appspot.com/o/products%2F6628797d-f547-4da2-8988-cdd85bd41ca4%2F3abec070-550c-498b-b3f5-5e5ea67e5a9c?alt=media&token=48c5ef26-3bca-45f0-8e11-1b44e6c4f5d4',
				average_rating: 0,
			},
		],
		data_solicitacao: new Date(2024, 1, 15).toISOString(),
	},
	{
		motivo: 'Produto danificado',
		isAnalyzing: false,
		code: '#1231232',
		isKiosk: true,
		quiosque_troca: 'Quiosque Goold - Moema - São Paulo/SP',
		codigo_correios: '3034321',
		data_expiracao_correios: '2024-03-10',
		status: 'Troca realizada',
		lista_produtos: [
			{
				id: 'ef7e5387-efb0-4e35-9d9d-90eac3352527',
				quantity: 2,
				title: 'PRÉ-POO®️ BABOSA E AZEITE DE OLIVA - 250ml',
				price: 117,
				category: 'MÁSCARAS',
				description:
					'Prepare-se para revolucionar o cuidado com seus cabelos com o PRÉ-POO BABOSA E AZEITE DE OLIVA.',
				products_photos:
					'https://firebasestorage.googleapis.com/v0/b/gold-spell.firebasestorage.app/o/highlights%2F0d21e9ef-7e97-4d07-ab4d-46a3d4a362a7_50.webp?alt=media&token=604fb8b5-b6aa-4c33-a380-0d878bbe2eac',
				average_rating: 0,
			},
			{
				id: '2e5cac21-c691-4280-aa21-5778c6494eaa',
				quantity: 2,
				title: 'SMELL EFEITO SONECA - 120ml',
				price: 97,
				category: 'FINALIZADORES',
				description:
					'O Smell Efeito Soneca é um spray de brilho e perfume capilar com o já amado cheiro do Efeito Soneca.',
				products_photos:
					'https://firebasestorage.googleapis.com/v0/b/gold-app-810f5.appspot.com/o/products%2F2e5cac21-c691-4280-aa21-5778c6494eaa%2F6949b727-8ed7-4dfb-acc8-c566ebbd7338?alt=media&token=e933f463-35ef-49d5-b405-f458c6ff24c2',
				average_rating: 0,
			},
			{
				id: '6628797d-f547-4da2-8988-cdd85bd41ca4',
				quantity: 2,
				title: 'BODY SPLASH PODEROSA GOOLD - 250ml',
				price: 77,
				category: 'LINHA CORPORAL',
				description:
					'O Body Splash Goold é o toque final perfeito para deixar sua pele perfumada e refrescante o dia todo.',
				products_photos:
					'https://firebasestorage.googleapis.com/v0/b/gold-app-810f5.appspot.com/o/products%2F6628797d-f547-4da2-8988-cdd85bd41ca4%2F3abec070-550c-498b-b3f5-5e5ea67e5a9c?alt=media&token=48c5ef26-3bca-45f0-8e11-1b44e6c4f5d4',
				average_rating: 0,
			},
		],
		data_solicitacao: new Date(2024, 0, 30).toISOString(),
	},
	{
		motivo: 'Troca por tamanho errado',
		isAnalyzing: false,
		code: '#1231232',
		isKiosk: false,
		codigo_correios: '4023304',
		data_expiracao_correios: '2024-02-28',
		status: 'Solicitação recusada',
		lista_produtos: [
			{
				id: '2e5cac21-c691-4280-aa21-5778c6494eaa',
				quantity: 2,
				title: 'SMELL EFEITO SONECA - 120ml',
				price: 97,
				category: 'FINALIZADORES',
				description:
					'O Smell Efeito Soneca é um spray de brilho e perfume capilar com o já amado cheiro do Efeito Soneca.',
				products_photos:
					'https://firebasestorage.googleapis.com/v0/b/gold-app-810f5.appspot.com/o/products%2F2e5cac21-c691-4280-aa21-5778c6494eaa%2F6949b727-8ed7-4dfb-acc8-c566ebbd7338?alt=media&token=e933f463-35ef-49d5-b405-f458c6ff24c2',
				average_rating: 0,
			},
		],
		data_solicitacao: new Date(2024, 1, 10).toISOString(),
	},
];

export const returnReasonOptions = [
	{ value: 'damaged', label: 'Produto danificado' },
	{ value: 'wrong-item', label: 'Produto errado recebido' },
	{ value: 'changed-mind', label: 'Me arrependi da compra' },
	{ value: 'other', label: 'Outro motivo' },
];

export function generateOptionsQuantity(total) {
	const options = [];
	for (let i = total; i >= 1; i--) {
		options.push({ value: i.toString(), label: i.toString() });
	}
	return options;
}
