import { WriteStream, createWriteStream } from 'node:fs';

export interface FileWriter {
  write(row: string): void;
}

export class TSVFileWriter implements FileWriter {
  private stream: WriteStream;

  constructor(filePath: string) {
    this.stream = createWriteStream(filePath, {
      flags: 'w',
      encoding: 'utf-8',
      autoClose: true,
    });
  }

  public async write(row: string): Promise<unknown> {
    const writeSuccess = this.stream.write(`${row}\n`);
    if (!writeSuccess) {
      return new Promise((res) => {
        this.stream.once('drain', () => res(true));
      });
    }

    return Promise.resolve();
  }
}
