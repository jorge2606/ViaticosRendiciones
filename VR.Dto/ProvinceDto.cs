using System;
using System.Collections.Generic;
using System.Text;

namespace VR.Dto
{
    public class ProvinceBaseDto
    {
        public Guid Id { set; get; }
        public string Name { set; get; }
        public DateTime CreatedDate { set; get; }
        public Boolean IsDeleted { set; get; }
    }

    public class CreateProvinceDto : ProvinceBaseDto { }

    public class UpdateProvinceDto : ProvinceBaseDto { }

    public class DeleteProvinceDto : ProvinceBaseDto { }

    public class FindByIdProvinceDto : ProvinceBaseDto { }

    public class AllProvinceDto : ProvinceBaseDto { }
}
