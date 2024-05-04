import React, { useEffect, useState } from 'react';
import './addingPlatform.css';
import { IClient } from '../interfaces/IClient';
import IFactory from '../interfaces/IFactory';
import IStrategy from '../interfaces/IStrategy';

function AddingPlatform() {
    // Операції з користувачами. Ініціалізація
    const [accounts, setAccounts] = useState<IClient[]>(() => {
        const savedAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');
        return savedAccounts;
    });

    const [formData, setFormData] = useState<IClient>({
        name: "",
        age: 0,
        position: "",
        experience: 0,
        discipline: ""
    });

    const disciplinesOptions: string[] = ["Finance", "Management", "Marketing", "Human Resources", "IT"];

    useEffect(() => {
        localStorage.setItem('accounts', JSON.stringify(accounts));
    }, [accounts]);

    // Додавання інформації про користувача в режимі реального часу
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: name === "age" || name === "experience" ? parseInt(value) : value
        }));
    };

    // Ініціалізація класу шаблону "Фабрика"
    class AccountFactory extends IFactory {
        createAccount(): IClient {
            return formData;
        }
    }

    // Використання "Фабрики"
    const createAccount = () => {
        const factory: IFactory = new AccountFactory();
        const account: IClient = factory.createAccount();
        setAccounts(prevAccounts => [...prevAccounts, account]);
        setFormData({
            name: "",
            age: 0,
            position: "",
            experience: 0,
            discipline: ""
        });
    };

    // Ініціалізація класу шаблону "Стратегія"
    class SortingStrategy extends IStrategy {
        sortByDiscipline(accounts: IClient[]): IClient[] {
            return [...accounts].sort((a, b) => a.discipline.localeCompare(b.discipline));
        }

        sortByExperience(accounts: IClient[]): IClient[] {
            return [...accounts].sort((a, b) => a.experience - b.experience);
        }
    }

    // Використання "Стратегії"
    const sortingStrategy = new SortingStrategy();

    const sortByExperience = () => {
        const sortedAccounts = sortingStrategy.sortByExperience(accounts);
        setAccounts(sortedAccounts);
    };

    const sortByDiscipline = () => {
        const sortedAccounts = sortingStrategy.sortByDiscipline(accounts);
        setAccounts(sortedAccounts);
    };

    // Видалення акаунту
    const deleteAccount = (indexToDelete: number) => {
        const filteredAccounts = accounts.filter((_, index) => index !== indexToDelete);
        setAccounts(filteredAccounts);
    };

    return (
        <div className='platform'>
            <div className="container">
                <div className="platform__wrapper">
                    <div className="platform__left">
                        <form className="platform__form">
                            <label>
                                <span>Name</span>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                            </label>
                            <label>
                                <span>Age</span>
                                <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
                            </label>
                            <label>
                                <span>Position</span>
                                <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Position" />
                            </label>
                            <label>
                                <span>Years of experience</span>
                                <input type="number" name="experience" value={formData.experience} onChange={handleChange} placeholder="Experience" />
                            </label>
                            <label>
                                <span>Choose your best discipline</span>
                                <select name="discipline" value={formData.discipline} onChange={handleChange}>
                                    <option value="">Select Discipline</option>
                                    {disciplinesOptions.map((discipline, index) => (
                                        <option key={index} value={discipline}>{discipline}</option>
                                    ))}
                                </select>
                            </label>
                        </form>
                        <div className="platform__buttons">
                            <button onClick={createAccount}>Add employee</button>
                        </div>
                    </div>
                    <div className="platform__right">
                        <table className="platform__table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Position</th>
                                    <th>Experience</th>
                                    <th>Discipline</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts.length > 0 ? (
                                    accounts.map((account, index) => (
                                        <tr key={index} className="account-item">
                                            <td>{account.name}</td>
                                            <td>{account.age}</td>
                                            <td>{account.position}</td>
                                            <td>{account.experience}</td>
                                            <td>{account.discipline}</td>
                                            <td><button onClick={() => deleteAccount(index)}>X</button></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5}>Table is empty</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <div className="platform__buttons">
                            <button onClick={sortByExperience}>Sort by experience</button>
                            <button onClick={sortByDiscipline}>Sort by discipline</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddingPlatform;
