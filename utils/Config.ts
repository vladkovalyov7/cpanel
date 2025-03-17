import * as fs from "fs";
import * as path from "path";

export class Config {
  private static instance: Config;
  private properties: { baseUrl?: string; testIp?: string } = {};

  private constructor() {
    this.loadProperties();
  }

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  private loadProperties() {
    const configPath = path.join(__dirname, "../resources/config.properties");
    if (fs.existsSync(configPath)) {
      const fileContent = fs.readFileSync(configPath, "utf-8");
      fileContent.split("\n").forEach((line) => {
        const [key, value] = line.split("=");
        if (key && value) {
          this.properties[key.trim()] = value.trim();
        }
      });
    }
  }

  get baseUrl(): string {
    if (!this.properties.baseUrl) {
      throw new Error("Property 'baseUrl' is missing in config.properties");
    }
    return this.properties.baseUrl.trim();
  }

  get testIp(): string {
    if (!this.properties.testIp) {
      throw new Error("Property 'testIp' is missing in config.properties");
    }
    return this.properties.testIp.trim();
  }
}
