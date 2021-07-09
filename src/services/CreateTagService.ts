import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";


// interface IRequestTag{
//    name: string;
// }

class CreateTagService{

    async execute(name: string){
        const tagsRepositories = getCustomRepository(TagsRepositories);
        if(!name){
            throw new Error("Incorrect name!");
        }
        const tagAlreadyExists = await tagsRepositories.findOne({
            name
        });

        if(tagAlreadyExists){
            throw new Error("Tag Already Exists!")
        }
        const tag = tagsRepositories.create({
            name
        });
        await tagsRepositories.save(tag);
        return tag;

    }

}

export{CreateTagService}