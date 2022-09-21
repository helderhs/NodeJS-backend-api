import multer from 'multer';
import path from 'path';
//import crypto from 'crypto';
//const uploadFolder = path.resolve(__dirname, './uploads');
const uploadFolder = path.resolve(__dirname, '..', 'uploads');
console.log(uploadFolder);

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      const extensaoArquivo = file.originalname.split('.')[1];
      const nomeArquivo = file.originalname.split('.')[0];
      //const fileHash = crypto.randomBytes(10).toString('hex');
      const filename = `${nomeArquivo}-${file.originalname}`;

      // Indica o novo nome do arquivo:
      callback(null, `${nomeArquivo}.${extensaoArquivo}`);
      //callback(null, filename);
    },
  }),
};
