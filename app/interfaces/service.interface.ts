export interface ServiceInterface {

    create<T>(data: T);
    get(id: number);
    set<T>(object: T);
    add<T>(object: T);
    update<T>(object: T);
    delete<T>(object: T);
    generateData<T>(object: T);

}
