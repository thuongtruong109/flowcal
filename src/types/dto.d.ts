type IAbstract = {
  _id: mongoose.Schema.Types.ObjectId;
}

export type IRoleDto = IAbstract & IRole;