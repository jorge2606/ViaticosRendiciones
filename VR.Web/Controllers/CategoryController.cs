using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VR.Data;
using VR.Data.Model;
using VR.Dto;
using VR.Service.Interfaces;
using VR.Web.Helpers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VR.Web.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class CategoryController : Controller
    {
        private readonly ICategoryService _categoryService;
        private readonly DataContext _dataContext;
        private readonly IMapper _mapper;
        public CategoryController(
                ICategoryService categoryService,
                DataContext dataContext,
                IMapper mapper)
        {
            _categoryService = categoryService;
            _dataContext = dataContext;
            _mapper = mapper;
        }
        // GET: api/<controller>
        [HttpGet("FindByIdCategory/{idCategory}")]
        public IActionResult FindByIdCategory(Guid idCategory)
        {
            var categoryFound = _categoryService.FindByIdCategory(idCategory);

            if (!categoryFound.IsSuccess)
            {
                return BadRequest();
            }

            return Ok(categoryFound.Response);
        }

        // POST api/<controller>
        [HttpPost("CreateCategory")]
        public IActionResult CreateCategory([FromBody]CreateCategoryDto categoryDto)
        {
            var response = _categoryService.CreateCategory(categoryDto);

            if (!response.IsSuccess)
            {
                return BadRequest(response);
            }

            return Ok(response.Response);
        }

        // PUT api/<controller>/5
        [HttpPut("UpdateCategory")]
        public IActionResult UpdateCategory([FromBody]UpdateCategoryDto updateCategory)
        {
            var result = _categoryService.UpdateCategory(updateCategory);

            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response);
        }

        // DELETE api/<controller>/5
        [HttpDelete("Delete/{categoryId}")]
        public IActionResult Delete(Guid categoryId)
        {
            var response = _categoryService.DeleteCategory(categoryId);

            if (!response.IsSuccess)
            {
                return BadRequest(response);
            }

            return Ok(response.Response);
        }

        public IQueryable<AllCategoryDto> queryableUser()
        {
            var Paginator = _dataContext.Categories.Select(x => _mapper.Map<AllCategoryDto>(x) ).OrderBy(x => x.Id);
            return Paginator;
        }

        [HttpGet("page")]
        public PagedResult<AllCategoryDto> userPagination([FromQuery] FilterCategoryDto filters)
        {
            const int pageSize = 10;
            var queryPaginator = queryableUser();

            var result = queryPaginator.Where(
                  x=> string.IsNullOrEmpty(filters.Name) || x.Name.ToUpper().Contains(filters.Name.ToUpper())
                 ).Skip((filters.Page ?? 0) * pageSize)
                .Take(pageSize)
                .ToList();
            return new PagedResult<AllCategoryDto>
            {
                List = result,
                TotalRecords = result.Count()
            };
        }
    }
}
