import { IClient } from "./IClient";

export default abstract class IFactory {
    abstract createAccount(): IClient;
}
