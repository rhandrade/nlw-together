import { getCustomRepository } from 'typeorm'
import { AppException } from '../exceptions/AppException';
import { TagsRepositories } from '../repositories/TagsRepositories'


class CreateTagService{
    async execute(name: string) {

        const tagsRepositories = getCustomRepository(TagsRepositories);

        if(!name){
            throw new AppException({ message: 'Incorrect name' });
        }

        const tagAlreadyExists = await tagsRepositories.findOne({ name });

        if(tagAlreadyExists){
            throw new AppException({ message: 'Tag already exists' });
        }

        const tag = tagsRepositories.create({ name });
        await tagsRepositories.save(tag);

        return tag;
        
    }
}


export { CreateTagService }