export const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return format(new Date(dateString), "dd/MM/yyyy");
    } catch (error) {
      return "Data inválida";
    }
};

export const formatCpfCnpj = (value) => {
  value = value.replace(/\D/g, "");

  if (value.length <= 11) {
    return value
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
      .slice(0, 14);
  } else {
    return value
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,4})$/, "$1/$2")
      .replace(/(\d{4})(\d{1,2})$/, "$1-$2")
      .slice(0, 18);
  }
};

export const formatValue = (value) => {
	return value.toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	});
};

export const formatPhone = (value) => {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{1,4}).*/, "$1-$2")
    .slice(0, 15);
};

export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

export const formatDateBoleto = (date) => {
	const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

	if (!regex.test(date)) {
		return 'Formato de data inválido';
	}

	const dataObj = new Date(date);

	if (isNaN(dataObj.getTime())) {
		return 'Data inválida';
	}

	const dia = dataObj.getDate().toString().padStart(2, '0');
	const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
	const ano = dataObj.getFullYear();

	return `${dia}/${mes}/${ano}`;
};

export const formatedAddres = (address) => {
  return `${address.line_1} ${address.number} ${address.city} ${address.zip_code} ${address.complement} - ${address.neighborhood} / ${address.state}`;
};

