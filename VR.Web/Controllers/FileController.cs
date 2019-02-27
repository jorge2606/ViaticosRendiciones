using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.FileProviders;
using VR.Web.Helpers;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;
using VR.Dto;
using VR.Service.Interfaces;

namespace VR.Web.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class FileController : ControllerBase
    {
        private IFileService _fileService;
        private IFileProvider _fileProvider;

        public FileController(IFileService fileService, IHostingEnvironment env)
        {
            _fileService = fileService;
            _fileProvider = env.ContentRootFileProvider;
        }

        [HttpPost("UpdateMyImage")]
        public async Task<IActionResult> UpdateMyImage(UpdateMyImageDto fileCreateDto)
        {
            fileCreateDto.UserId = GetIdUser();

           var result = await _fileService.UpdateMyImage(fileCreateDto);
            if (!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Response.File);
        }

        [HttpGet("{userId}")]
        public IActionResult FileById(Guid userId)
        {
           var result = _fileService.GetByIdFile(userId);
            if (!result.IsSuccess)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpDelete("removePhoto/{userId}")]
        public IActionResult RemoveFile(Guid userId)
        {
            var result = _fileService.RemoveProfilePhoto(userId);
            if (!result.IsSuccess)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpDelete("removeHolographSign/{userId}")]
        public IActionResult RemoveHolographSign(Guid userId)
        {
            var result = _fileService.RemoveHolographSign(userId);
            if (!result.IsSuccess)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpGet("{userId}/{width}/{height}")]
        [AllowAnonymous]
        public async Task<IActionResult> ResizeImage(Guid userId, int width, int height)
        {
            if (width < 0 || height < 0) { return BadRequest(); }

            var result = _fileService.GetCompletePath(userId);

            FileInfo fileInfo = new FileInfo(result.Response.Paths);

            var outputStream = new MemoryStream();

            if (!fileInfo.Exists) { return NotFound(); }

            using (var image = Image.Load(fileInfo.FullName))
            {
                image.Mutate(x => x
                    .Resize(width, height));
                
                image.SaveAsJpeg(outputStream);

                outputStream.Seek(0, SeekOrigin.Begin);

                return File(outputStream, "image/jpg");
            }
            
        }
        

        [HttpPost("HolographSignUpdate")]
        public IActionResult HolographSignUpdate(UpdateMyImageDto image)
        {
            image.UserId = GetIdUser();
            var result = _fileService.HolographSignUpdate(image);

            if (!result.Result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result.Result.Response);
        }

        public Guid GetIdUser()
        {
            var currentUser = Helpers.HttpContext.Current.User.Claims;
            var result = Guid.Empty;
            foreach (var i in currentUser)
            {
                if (i.Type.Equals("NameIdentifier"))
                {
                    result = Guid.Parse(i.Value);
                }
            }

            return result;
        }

        [HttpGet("HolographSign/{userId}/{width}/{height}")]
        [AllowAnonymous]
        public async Task<IActionResult> HolographSign(Guid userId, int width, int height)
        {
            if (width < 0 || height < 0) { return BadRequest(); }
            var result = _fileService.GetCompletePathHolographSign(userId);

            FileInfo fileInfo = new FileInfo(result.Response.Paths);

            var outputStream = new MemoryStream();

            if (!fileInfo.Exists) { return NotFound(); }

            using (var image = Image.Load(fileInfo.FullName))
            {
                image.Mutate(x => x
                    .Resize(width, height));

                image.SaveAsJpeg(outputStream);

                outputStream.Seek(0, SeekOrigin.Begin);

                return File(outputStream, "image/jpg");
            }

        }


        [HttpGet("ExpenditureRefund/{expId}/{width}/{height}")]
        [AllowAnonymous]
        public async Task<IActionResult> ExpenditureRefund(Guid expId, int width, int height)
        {
            if (width < 0 || height < 0) { return BadRequest(); }
            var result = _fileService.GetUrlExpenditureRefundFile(expId);
            

            var outputStream = new MemoryStream(result.Response,0,result.Response.Length);

            using (Image<Rgba32> image = new Image<Rgba32>(width,height))
            {
                image.SaveAsJpeg(outputStream);
                outputStream.Seek(0, SeekOrigin.Begin);
                
                return File(outputStream, "image/jpg");
            }
            
            
        }

    }

}
