using DemoCrud.Data;
using DemoCrud.Models;
using Microsoft.AspNetCore.Mvc;

namespace DemoCrud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WebsiteController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetWebsites()
        {
            return Ok(WebsiteStore.GetWebsites());
        }

        [HttpGet("{id}")]
        public IActionResult GetWebsite(int id)
        {
            var website = WebsiteStore.GetWebsite(id);
            if (website == null)
            {
                return NotFound();
            }
            return Ok(website);
        }

        [HttpPost]
        public IActionResult AddWebsite(Website website)
        {
            WebsiteStore.AddWebsite(website);
            return CreatedAtAction(nameof(GetWebsite), new { id = website.Id }, website);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateWebsite(int id, Website website)
        {
            if (id != website.Id)
            {
                return BadRequest();
            }
            WebsiteStore.UpdateWebsite(website);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteWebsite(int id)
        {
            WebsiteStore.DeleteWebsite(id);
            return NoContent();
        }
    }
}
