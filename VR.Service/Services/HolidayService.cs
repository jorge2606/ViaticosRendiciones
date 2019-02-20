using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FluentValidation;
using FluentValidation.Results;
using Service.Common.Extensions;
using Service.Common.ServiceResult;
using VR.Data;
using VR.Data.Model;
using VR.Dto;
using VR.Service.Interfaces;
using VR.Web.Helpers;

namespace VR.Service.Services
{
    public class HolidayService : IHolidayService
    {
        private readonly DataContext _dataContext;
        private readonly IValidator<HolidayBaseDto> _fluentValidator;
        private readonly IMapper _mapper;
        
        public HolidayService(
            DataContext dataContext,
            IValidator<HolidayBaseDto> fluentValidator,
            IMapper mapper
            )
        {
            _dataContext = dataContext;
            _fluentValidator = fluentValidator;
            _mapper = mapper;
        }

        public ServiceResult<CreateHolidayDto> CreateHoliday(CreateHolidayDto holidayDto)
        {
            var validate = _fluentValidator.Validate(holidayDto);
            if (!validate.IsValid)
            {
                return  validate.ToServiceResult<CreateHolidayDto>(null);
            }
            
            _dataContext.Holidays.Add(
                new Holiday()
                {
                    Id = new Guid(),
                    Description = holidayDto.Description,
                    Date = DateTime.Parse(holidayDto.Date.Day+"/"+ holidayDto.Date.Month+"/"+ holidayDto.Date.Year) 
                }
            );

            _dataContext.SaveChanges();

            return new ServiceResult<CreateHolidayDto>(holidayDto);
        }

        public ServiceResult<UpdateHolidayDto> UpdateHoliday(UpdateHolidayDto holidayDto)
        {

            var validate = _fluentValidator.Validate(holidayDto);
            
            if (!validate.IsValid)
            {
                return validate.ToServiceResult<UpdateHolidayDto>(null);
            }

            var exist = _dataContext.Holidays.FirstOrDefault(x => x.Id == holidayDto.Id);

            if (exist == null)
            {
                return new ServiceResult<UpdateHolidayDto>(null);
            }

            exist.Date = DateTime.Parse(holidayDto.Date.Day + "/" + holidayDto.Date.Month + "/" + holidayDto.Date.Year);
            exist.Description = holidayDto.Description;

            _dataContext.Holidays.Update(exist);

            _dataContext.SaveChanges();

            return new ServiceResult<UpdateHolidayDto>(holidayDto);

        }

        public ServiceResult<DeleteHolidayDto> DeleteHoliday(Guid HolidayId)
        {
            var exist = _dataContext.Holidays.FirstOrDefault(x => x.Id == HolidayId);

            if (exist == null)
            {
                return new ServiceResult<DeleteHolidayDto>(null);
            }

            exist.IsDeleted = true;
            _dataContext.Holidays.Update(exist);
            _dataContext.SaveChanges();

            return new ServiceResult<DeleteHolidayDto>(_mapper.Map<DeleteHolidayDto>(exist));
        }

        public ServiceResult<List<AllHolidayDto>> AllHoliday()
        {
            return _mapper.Map< ServiceResult<List<AllHolidayDto>> >(
                _dataContext.Holidays
                    .Where(x => x.IsDeleted != true)
                    .ToList());
        }

        public ServiceResult<FindByIdHolidayDto> FindByIdHoliday(Guid id)
        {
            var exist = _dataContext.Holidays
                .Where(x => x.IsDeleted != true)
                .FirstOrDefault(x => x.Id == id);
            if (exist == null)
            {
                return new ServiceResult<FindByIdHolidayDto>(null);
            }

            return new ServiceResult<FindByIdHolidayDto>(_mapper.Map <FindByIdHolidayDto>(exist));
        }

        public ServiceResult<PagedResult<AllHolidayDto>> Pagination(FilterHolidayDto filters)
        {
            const int pageSize = 10;

            var resultFull = _dataContext.Holidays
                .Where(x => x.IsDeleted != true);


            var resultPage = resultFull
                .Where(
                    x => (string.IsNullOrEmpty(filters.Description) || x.Description.ToUpper().Contains(filters.Description.ToUpper()))
                         &&
                         (filters.Date == null || DateTime.Compare(x.Date, filters.Date.ToDateTime()) == 0)
                ).Skip((filters.Page ?? 0) * pageSize)
                .Take(pageSize)
                .ProjectTo<AllHolidayDto>()
                .ToList();

            return new ServiceResult<PagedResult<AllHolidayDto>>(new PagedResult<AllHolidayDto>()
            {
                List = resultPage,
                TotalRecords = resultFull.Count()
            });
        }
    }
}
