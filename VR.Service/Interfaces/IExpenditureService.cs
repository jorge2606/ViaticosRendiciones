using System;
using System.Collections.Generic;
using System.Text;
using Service.Common.ServiceResult;
using VR.Dto;

namespace VR.Service.Interfaces
{
    public interface IExpenditureService
    {
        ServiceResult<CreateExpenditureDto> CreateDistribution(CreateExpenditureDto expenditureDto);
        ServiceResult<UpdateExpenditureDto> UpdateExpenditure(UpdateExpenditureDto expenditureDto);
        ServiceResult<DeleteExpenditureDto> DeleteExpenditure(Guid expenditureId);
        ServiceResult<FindByIdExpenditureDto> FindByIdExpenditure(Guid id);
        ServiceResult<List<AllExpenditureDto>> AllExpenditure();
    }
}
