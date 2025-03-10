export const validateCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, "");

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    let soma = 0;
    let peso = 10;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * peso--;
    }
    let primeiroDigito = 11 - (soma % 11);
    if (primeiroDigito === 10 || primeiroDigito === 11) {
      primeiroDigito = 0;
    }

    soma = 0;
    peso = 11;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * peso--;
    }
    soma += primeiroDigito * 2;
    let segundoDigito = 11 - (soma % 11);
    if (segundoDigito === 10 || segundoDigito === 11) {
      segundoDigito = 0;
    }

    if (
      primeiroDigito === parseInt(cpf.charAt(9)) &&
      segundoDigito === parseInt(cpf.charAt(10))
    ) {
      return true;
    } else {
      return false;
    }
};

export const validateCNPJ = (cnpj) => {
    cnpj = cnpj.replace(/[^\d]+/g, "");

    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
    }

    let soma = 0;
    let peso = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    for (let i = 0; i < 12; i++) {
      soma += parseInt(cnpj.charAt(i)) * peso[i];
    }
    let primeiroDigito = 11 - (soma % 11);
    if (primeiroDigito === 10 || primeiroDigito === 11) {
      primeiroDigito = 0;
    }

    soma = 0;
    peso = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3];
    for (let i = 0; i < 12; i++) {
      soma += parseInt(cnpj.charAt(i)) * peso[i];
    }
    soma += primeiroDigito * 2;
    let segundoDigito = 11 - (soma % 11);
    if (segundoDigito === 10 || segundoDigito === 11) {
      segundoDigito = 0;
    }

    if (
      primeiroDigito === parseInt(cnpj.charAt(12)) &&
      segundoDigito === parseInt(cnpj.charAt(13))
    ) {
      return true;
    } else {
      return false;
    }
};

export const velidateDocument = (document, setError, clearErrors) => {
    const newDocument = document.replace(/\D/g, "");
    if (newDocument.length < 11) {
      setError("document", {
        type: "manual",
        message: "Documento inválido!",
      });
    } else if (newDocument.length < 14) {
      const response = validateCPF(newDocument);
      if (!response) {
        setError("document", {
          type: "manual",
          message: "Número de CPF inválido!",
        });
      } else {
        clearErrors(["document"]);
      }
    } else {
      const response = validateCNPJ(newDocument);
      if (!response) {
        setError("document", {
          type: "manual",
          message: "Número de CNPJ inválido!",
        });
      } else {
        clearErrors(["document"]);
      }
    }
};
