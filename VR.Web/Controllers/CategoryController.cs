using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public CategoryController(ICategoryService categoryService,
            DataContext dataContext)
        {
            _categoryService = categoryService;
            _dataContext = dataContext;
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

            return Ok(response);
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

        public IQueryable<Category> queryableUser()
        {
            var Paginator = _dataContext.Categories.OrderBy(x => x.Id);
            return Paginator;
        }

        [HttpGet("page/{page}")]
        public PagedResult<Category> userPagination(int? page)
        {
            const int pageSize = 10;
            var queryPaginator = queryableUser();

            var result = queryPaginator.Skip((page ?? 0) * pageSize)
                .Take(pageSize)
                .ToList();
            return new PagedResult<Category>
            {
                List = result,
                TotalRecords = queryPaginator.Count()
            };
        }
    }
}
