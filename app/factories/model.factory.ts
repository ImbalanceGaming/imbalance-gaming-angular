import Type = ts.Type;

export class ModelFactory {

    createModel<T extends Object>(
        model: { new(): T ;},
        modelProperties: Array<{name: string, value: any}>,
        modelRelations: Array<{name:string, object: {new(): T}}>,
        relationData: Array<Object>
    ) : T {

        let model = new model();

        for (let key in model) {

            if (model.hasOwnProperty(key)) {
                modelProperties.forEach((property) => {
                    if (property.name === key) {
                        model[key] = property;
                    }
                });

                modelRelations.forEach((relation) => {
                    if (relation.name === key) {
                        let relation = new relation.object();

                        relationData.forEach(data => {

                        })
                    }
                });

            }

        }

        return T;

    }

}
