interface hasNameProperty {
    name: string;
}
interface hasNameOrAge {
    name?: string;
    age?: number;
}
function nameToUpperCaseM<T extends hasNameOrAge>(obj: T): T {
    obj.name;
    obj.age
    return obj;
}
const a = {
    name: "a"
};
console.log(nameToUpperCaseM<hasNameProperty>(a));

