using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using FluentValidation;
using Service.Common.Extensions;
using Service.Common.ServiceResult;
using VR.Data;
using VR.Data.Model;
using VR.Dto;
using VR.Service.Interfaces;

namespace VR.Service.Services
{
    public class ExpenditureService : IExpenditureService
    {
        private readonly DataContext _dataContext;
        private readonly IValidator<ExpenditureBaseDto> _fluentValidator;
        private IMapper _mapper;

        public ExpenditureService(DataContext dataContext, IValidator<ExpenditureBaseDto> fluentValidator,
            IMapper mapper)
        {
            _dataContext = dataContext;
            _fluentValidator = fluentValidator;
            _mapper = mapper;
        }

        public ServiceResult<CreateExpenditureDto> CreateDistribution(CreateExpenditureDto expenditure)
        {
            var validation = _fluentValidator.Validate(expenditure);

            if (!validation.IsValid)
            {
                return _mapper.Map<ServiceResult<CreateExpenditureDto>>(validation.ToServiceResult<CreateExpenditureDto>(null));
            }

            Expenditure newExpenditure = new Expenditure()
            {
                Id = new Guid(),
                Description = expenditure.Description,
                Name = expenditure.Name
            };

            _dataContext.Expenditures.Add(newExpenditure);
            _dataContext.SaveChanges();

            return new ServiceResult<CreateExpenditureDto>(expenditure);

        }

        public ServiceResult<UpdateExpenditureDto> UpdateExpenditure(UpdateExpenditureDto expenditure)
        {
            var validate = _fluentValidator.Validate(expenditure);

            var updateExpenditure = _dataContext.Expenditures.FirstOrDefault(x => x.Id == expenditure.Id);

            if (!validate.IsValid || updateExpenditure == null)
            {
                return _mapper.Map<ServiceResult<UpdateExpenditureDto>>(
                    validate.ToServiceResult<UpdateExpenditureDto>(null));
            }

            Expenditure updateExpend = new Expenditure()
            {
                Name = expenditure.Name,
                Description = expenditure.Description,
            };

            _dataContext.Expenditures.Update(updateExpend);
            _dataContext.SaveChanges();

            return new ServiceResult<UpdateExpenditureDto>(expenditure);

        }

        public ServiceResult<FindByIdExpenditureDto> FindByIdExpenditure(Guid id)
        {
            var expenditure = _dataContext.Expenditures.FirstOrDefault(x => x.Id == id);

            if (expenditure == null)
            {
                return new ServiceResult<FindByIdExpenditureDto>(null);
            }

            return new ServiceResult<FindByIdExpenditureDto>( _mapper.Map<FindByIdExpenditureDto>(expenditure) );
        }

        public ServiceResult<DeleteExpenditureDto> DeleteExpenditure(Guid expenditureId)
        {
            var delete = _dataContext.Expenditures.FirstOrDefault(x => x.Id == expenditureId);

            if (delete == null)
            {
                return new ServiceResult<DeleteExpenditureDto>(null);
            }

            _dataContext.Expenditures.Remove(delete);
            _dataContext.SaveChanges();

            return new ServiceResult<DeleteExpenditureDto>( _mapper.Map<DeleteExpenditureDto>(delete));
        }

    }
}
