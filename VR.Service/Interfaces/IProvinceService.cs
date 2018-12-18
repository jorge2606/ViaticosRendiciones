using System;
using System.Collections.Generic;
using System.Text;
using Service.Common.ServiceResult;
using VR.Dto;

namespace VR.Service.Interfaces
{
    public interface IProvinceService
    {
        /**ServiceResult<CreateProvinceDto> CreateTransport(CreateProvinceDto transportDto);
        ServiceResult<UpdateProvinceDto> UpdateProvince(UpdateProvinceDto provinceDto);
        ServiceResult<DeleteProvinceDto> DeleteProvince(Guid idProvince);
        ServiceResult<FindByIdProvinceDto> FindByIdProvince(Guid idProvince);**/
        ServiceResult<List<AllProvinceDto>> GetAllProvince();
    }
}
