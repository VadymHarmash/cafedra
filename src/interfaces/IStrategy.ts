import { IClient } from "./IClient";

export default abstract class IStrategy {
    abstract sortByDiscipline(accounts: IClient[]): void;
    abstract sortByExperience(accounts: IClient[]): void;
}
