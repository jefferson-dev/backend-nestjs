export enum AppMessage {
  REQUEST_UNAUTHORIZED = 'Solicitação não autorizada.',
  AUTHENTICATE_ERROR = 'E-mail ou senha inválidos.',
  ACCOUNT_UNAUTHORIZED = 'Sua conta não tem permissão para acessar. Procure um administrador.',
  ACCOUNT_NOT_FOUND = 'Conta não encontrado.',
  ACCOUNT_DISABLE = 'Sua conta foi desativada do sistema. Procure um administrador.',
  ACCOUNT_EMAIL_EXISTS = 'Email já utilizado por outra pessoa.',
  ACCOUNT_UPDATE_PASSWORD_INVALID = 'Senha inválida.',
  USER_NOT_FOUND = 'Usuário não encontrado.',
  UPLOAD_FORMAT_INVALID = 'O formato de arquivo enviado não suportado.',
  UPLOAD_LIMIT_SIZE = 'O tamanho máximo do arquivo foi excedido.',
}
