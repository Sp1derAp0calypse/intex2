﻿using System;
using System.Collections.Generic;

namespace Intex.API.Controllers;

public partial class MoviesRating
{
    public int? UserId { get; set; }

    public string? ShowId { get; set; }

    public int? Rating { get; set; }
}
