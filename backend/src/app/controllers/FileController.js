import File from '../models/File';

class FileController {
  async store({ file: reqFile }, res) {
    const { originalname: name, filename: path } = reqFile;
    const file = await File.create({
      name,
      path,
    });
    res.json(file);
  }
}

export default new FileController();
