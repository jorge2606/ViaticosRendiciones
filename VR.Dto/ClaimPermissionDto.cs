using System;
using System.Collections.Generic;

namespace VR.Dto
{
    public class ClaimPermissionDto 
    {
        public ClaimPermissionDto()
        {
            Children = new List<ClaimPermissionDto>();
        }

        public string Text { get; set; }

        public string Value { get; set; }
            
        public List<ClaimPermissionDto> Children { get; set; }

        public string Name { get; set; }

        public static List<ClaimPermissionDto> GetPermissions()
        {
            var permissions = new List<ClaimPermissionDto>();

            permissions.Add(new ClaimPermissionDto()
            {
                Text = "Usuarios",
                Value = "",
                Children = new List<ClaimPermissionDto>
                {
                    new ClaimPermissionDto()
                    {
                        Text  = "Crear",
                        Value = "user.create"
                        
                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Editar",
                        Value = "user.edit"
                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Eliminar",
                        Value = "user.delete"
                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Ver",
                        Value = "user.view"
                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Enlazar agente a supervisor",
                        Value = "user.addSupervisor"
                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Ver relación agente-supervisor",
                        Value = "user.toSeeRelationshipBeetwenSupervisorAndAgent"
                    }

                }

            });

            permissions.Add(new ClaimPermissionDto()
            {
                Text = "Categories",
                Value = "",
                Children = new List<ClaimPermissionDto>
                {
                    new ClaimPermissionDto()
                    {
                        Text  = "Crear",
                        Value = "categories.create"

                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Editar",
                        Value = "categories.edit"
                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Eliminar",
                        Value = "categories.delete"
                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Ver",
                        Value = "categories.view"
                    }
                }

            });

            permissions.Add(new ClaimPermissionDto()
            {
                Text = "Organismos",
                Value = "",
                Children = new List<ClaimPermissionDto>
                {
                    new ClaimPermissionDto()
                    {
                        Text  = "Crear",
                        Value = "organisms.create"

                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Editar",
                        Value = "organisms.edit"
                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Eliminar",
                        Value = "organisms.delete"
                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Ver",
                        Value = "organisms.view"
                    }
                }

            });

            permissions.Add(new ClaimPermissionDto()
            {
                Text = "Repartición",
                Value = "",
                Children = new List<ClaimPermissionDto>
                {
                    new ClaimPermissionDto()
                    {
                        Text  = "Crear",
                        Value = "distributions.create"

                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Editar",
                        Value = "distributions.edit"
                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Eliminar",
                        Value = "distributions.delete"
                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Ver",
                        Value = "distributions.view"
                    }
                }

            });

            permissions.Add(new ClaimPermissionDto()
            {
                Text = "Transportes",
                Value = "",
                Children = new List<ClaimPermissionDto>
                {
                    new ClaimPermissionDto()
                    {
                        Text  = "Crear",
                        Value = "transports.create"

                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Editar",
                        Value = "transports.edit"
                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Eliminar",
                        Value = "transports.delete"
                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Ver",
                        Value = "transports.view"
                    }
                }

            });

            permissions.Add(new ClaimPermissionDto()
            {
                Text = "Feriados",
                Value = "",
                Children = new List<ClaimPermissionDto>
                {
                    new ClaimPermissionDto()
                    {
                        Text  = "Crear",
                        Value = "holidays.create"

                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Editar",
                        Value = "holidays.edit"
                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Eliminar",
                        Value = "holidays.delete"
                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Ver",
                        Value = "holidays.view"
                    }
                }

            });

            permissions.Add(new ClaimPermissionDto()
            {
                Text = "Conceptos de Gasto",
                Value = "",
                Children = new List<ClaimPermissionDto>
                {
                    new ClaimPermissionDto()
                    {
                        Text  = "Crear",
                        Value = "expenditures.create"

                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Editar",
                        Value = "expenditures.edit"
                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Eliminar",
                        Value = "expenditures.delete"
                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Ver",
                        Value = "expenditures.view"
                    }
                }

            });

            permissions.Add(new ClaimPermissionDto()
            {
                Text = "Solicitudes",
                Value = "",
                Children = new List<ClaimPermissionDto>
                {
                    new ClaimPermissionDto()
                    {
                        Text  = "Crear",
                        Value = "solicitations.create"

                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Crear Reintegro",
                        Value = "solicitations.createRefund"
                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Editar",
                        Value = "solicitations.edit"
                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Eliminar",
                        Value = "solicitations.delete"
                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Ver",
                        Value = "solicitations.view"
                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Moderar Solicitudes",
                        Value = "solicitations.moderateSolicitations"
                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Moderar Reintegros",
                        Value = "solicitations.moderateRefunds"
                    }
                }

            });

            permissions.Add(new ClaimPermissionDto()
            {
                Text = "Roles",
                Value = "",
                Children = new List<ClaimPermissionDto>
                {
                    new ClaimPermissionDto()
                    {
                        Text  = "Crear",
                        Value = "roles.create"

                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Editar",
                        Value = "roles.edit"
                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Eliminar",
                        Value = "roles.delete"
                    },
                    new ClaimPermissionDto()
                    {
                        Text  = "Ver",
                        Value = "roles.view"
                    }
                }

            });

            return permissions;
            
        }
    }

    public class RoleClaimPermissionDto
    {
        public RoleClaimPermissionDto()
        {
            Children = new List<RoleClaimPermissionDto>();
        }
        
        public string Text { get; set; }

        public string Value { get; set; }

        public bool Checked { get; set; }

        public List<RoleClaimPermissionDto> Children { get; set; }
    }

    public class UpdateRoleClaimPermissionDto
    {
        public Guid Id { get; set; }

        public List<RoleClaimPermissionDto> Claims { get; set; }
    }

    public class ClaimDto
    {
        public string Value { get; set; }
    }
}
